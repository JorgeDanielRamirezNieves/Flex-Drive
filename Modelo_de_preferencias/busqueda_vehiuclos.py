import os
from langchain_ollama import OllamaEmbeddings
from langchain_community.document_loaders import CSVLoader
import numpy as np
import faiss
import ollama
import tempfile
from concurrent.futures import ThreadPoolExecutor
import pandas as pd
import sqlite3
from fastapi import FastAPI, Request
from pydantic import BaseModel
import uvicorn
from fastapi import Body
import uuid
import re

class VehiculoRequest(BaseModel):
    type: str
    color: str
    mileage: str
    accesories: str
    capacity: str
    rating: str
    brand: str
    model: str
    year: str
    fuel_type: str
    weight: str
  

# Configuración de pandas para mostrar todo
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)

def cargar_o_generar_resumenes():
    if os.path.exists('vehiculos.db'):
        conn = sqlite3.connect('vehiculos.db')
        data = pd.read_sql('SELECT * FROM vehiculos', conn)
        conn.close()
    else:
        data = pd.read_csv('vehicles-schemafinal.csv')
        def generate_suggestions(row):
            prompt = f'''genera un resumen corto y preciso de los siguientes datos de un vehiculo:
            {row.to_dict()}, guarda el dato en un solo parrafo iniciando con "Resumen: " donde hable de todas las columnas y sin usar comillas ni puntos y aparte, solo un parrafo.'''
            response = ollama.generate(model='mistral', prompt=prompt)
            summary = response['response']
            return summary

        n_threads = 16  # Número de hilos para procesamiento paralelo
        with ThreadPoolExecutor(max_workers=n_threads) as executor:
            summaries = list(executor.map(generate_suggestions, [row for _, row in data.iterrows()]))
        data['summary'] = summaries

        conn = sqlite3.connect('vehiculos.db')
        data.to_sql('vehiculos', conn, if_exists='replace', index=False)
        conn.close()
    return data

# Cargar datos (de la BD o generando si no existen)
data = cargar_o_generar_resumenes()

# Guardar y cargar con CSVLoader
with tempfile.NamedTemporaryFile(mode='w', delete=False) as temp_file:
    data.to_csv(temp_file, index=False, encoding="utf-8")
    temp_filename = temp_file.name

loader = CSVLoader(temp_filename)
loaded_data = loader.load()
os.remove(temp_filename)

# Embedding de los documentos
embeddings = OllamaEmbeddings(model="mxbai-embed-large:latest")
embedded_doc = embeddings.embed_documents([text.page_content for text in loaded_data])
embedded_doc = np.array(embedded_doc)

index_full_docs = faiss.IndexFlatL2(embedded_doc.shape[1])
index_full_docs.add(embedded_doc)

# Embedding de los resúmenes
embedded_query = embeddings.embed_documents(data['summary'].tolist())
embedded_query = np.array(embedded_query)

index_datos = faiss.IndexFlatL2(embedded_query.shape[1])
index_datos.add(embedded_query)

# Función de búsqueda
def buscar_por_tags(user_tags, k=10):
    prompt_usuario = f"Resumen: {user_tags}"
    embedding_user = embeddings.embed_query(prompt_usuario)
    embedding_user = np.array([embedding_user])
    distances, indices = index_datos.search(embedding_user, k)
    resultados = data.iloc[indices[0]]
    return resultados

app = FastAPI()

class TagsRequest(BaseModel):
    tags: str
    k: int = 10
@app.post("/agregar")
def agregar_vehiculo(vehiculo: VehiculoRequest):
    # 1. Obtener el último ID y asignar uno nuevo
    global data
    if "ID" in data.columns and not data.empty:
        ids_validos = pd.to_numeric(data["ID"], errors="coerce").dropna()
        if not ids_validos.empty:
            ultimo_id = int(ids_validos.max())
            nuevo_id = ultimo_id + 1
        else:
            nuevo_id = 1
    else:
        nuevo_id = 1

    vehiculo_uuid = str(uuid.uuid4())

    # 2. Generar resumen incluyendo el ID y uuid
    datos = vehiculo.dict()
    datos_con_id = {"ID": nuevo_id, "uuid": vehiculo_uuid, **datos}
    prompt = f'''genera un resumen corto y preciso de los siguientes datos de un vehiculo:
    {datos_con_id}, guarda el dato en un solo parrafo iniciando con "Resumen: " donde hable de todas las columnas, incluyendo el ID y el uuid, y sin usar comillas ni puntos y aparte, sin repetir en un solo un parrafo.'''
    response = ollama.generate(model='mistral', prompt=prompt)
    resumen = response['response']

   # 3. Añadir a la base de datos SQLite
    df_nuevo = pd.DataFrame([{**{"ID": nuevo_id, "uuid": vehiculo_uuid}, **datos, "summary": resumen}])
    conn = sqlite3.connect('vehiculos.db')
    df_nuevo.to_sql('vehiculos', conn, if_exists='append', index=False)
    conn.close()

     # 4. Añadir a DataFrame en memoria
    data = pd.concat([data, df_nuevo], ignore_index=True)

    # 5. Añadir embedding a FAISS
    emb_nuevo = embeddings.embed_documents([resumen])
    emb_nuevo = np.array(emb_nuevo)
    index_datos.add(emb_nuevo)


    return {"msg": "Vehículo agregado exitosamente", "id": nuevo_id, "uuid": vehiculo_uuid, "resumen": resumen}

@app.post("/buscar")
def buscar_endpoint(request: TagsRequest):
    resultados = buscar_por_tags(request.tags, k=request.k)
    print("Resultados encontrados:", resultados)
    if 'uuid' in resultados.columns:
        resultados_unicos = resultados.drop_duplicates(subset=['uuid'])
        resultados_unicos = resultados_unicos.dropna(subset=['uuid'])
        return {"resultados": resultados_unicos[['uuid']].to_dict(orient="records")}
    # Si solo está en el resumen, extrae con regex
    ids_uuids = []
    seen_uuids = set()
    for resumen in resultados.get('summary', []):
        uuid_match = re.search(r'uuid[=: ]+([a-fA-F0-9\-]{36})', resumen)
        uuid_val = uuid_match.group(1) if uuid_match else None
        if uuid_val and uuid_val not in seen_uuids:
            ids_uuids.append({"uuid": uuid_val})
            seen_uuids.add(uuid_val)
    return {"resultados": ids_uuids}


if __name__ == "__main__":
    import sys
    if "runserver" in sys.argv:
        uvicorn.run("busqueda_vehiuclos:app", host="0.0.0.0", port=8000, reload=True)
    else:
        tags_usuario = input("Introduce los tags de búsqueda (ej: rojo, Toyota, 2018, gasolina): ")
        resultados = buscar_por_tags(tags_usuario)
        print(resultados[['summary']])
