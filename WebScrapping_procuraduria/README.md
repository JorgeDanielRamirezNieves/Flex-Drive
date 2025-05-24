# Proyecto de Captcha con Mistral y Flask

Este proyecto utiliza Ollama con el modelo Mistral para pasar preguntas de captcha a través de una API Flask.

## Requisitos

- Python 3.8+
- Ollama instalado y corriendo localmente
- Modelo Mistral descargado en Ollama (ollama pull mistral)

## Instalación

1. Crear y activar un entorno virtual
    python -m venv venv
    source venv/bin/activate  # Linux/Mac
    venv\Scripts\activate     # Windows

2. Instalar dependencias
    pip install -r requirements.txt

## Uso
- correr el aplicativo
    python app.py

## Enpoints

- /antecedentes
 realizar la verificación de la persona en procuradoria