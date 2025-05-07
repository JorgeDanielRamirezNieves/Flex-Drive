import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-pqrs',
  standalone: false,
  templateUrl: './admin-pqrs.component.html',
  styleUrl: './admin-pqrs.component.css',
})
export class AdminPqrsComponent {
  pqrsList = [
    {
      id: 1,
      tipo: 'petición',
      nombre: 'Juan',
      codigoServicio: '001',
      mensaje:
        '¿es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.?',
      respuesta: '',
    },
    {
      id: 2,
      tipo: 'petición',
      nombre: 'Juan',
      codigoServicio: '001',
      mensaje: '¿Cuándo es mi cita?',
      respuesta: '',
    },
    {
      id: 2,
      tipo: 'queja',
      nombre: 'Ana',
      codigoServicio: '002',
      mensaje: 'La atención fue demorada.',
      respuesta: '',
    },
    {
      id: 3,
      tipo: 'reclamo',
      nombre: 'Luis',
      codigoServicio: '003',
      mensaje: 'Me cobraron de más.',
      respuesta: '',
    },
    {
      id: 4,
      tipo: 'sugerencia',
      nombre: 'Clara',
      codigoServicio: '004',
      mensaje: 'Podrían mejorar la sala de espera.',
      respuesta: '',
    },
  ];

  visibleResponseBox: { [key: number]: boolean } = {};

  getPQRSByTipo(tipo: string) {
    return this.pqrsList.filter((p) => p.tipo === tipo);
  }

  toggleRespuesta(id: number) {
    this.visibleResponseBox[id] = !this.visibleResponseBox[id];
  }

  enviarRespuesta(pqrs: any) {
    console.log('Respuesta enviada:', pqrs.respuesta, 'para PQRS ID:', pqrs.id);
    this.visibleResponseBox[pqrs.id] = false;
  }
}
