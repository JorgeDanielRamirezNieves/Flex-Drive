import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { TypeReport } from '../../models/type-report';
import { Report } from '../../models/report';

@Component({
  selector: 'app-admin-pqrs',
  standalone: false,
  templateUrl: './admin-pqrs.component.html',
  styleUrl: './admin-pqrs.component.css',
})
export class AdminPqrsComponent implements OnInit {
  pqrsList: Report[] = [];
  visibleResponseBox: { [uuid: string]: boolean } = {};
  tipoExpandido: string | null = null;
  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.getAllReports().subscribe({
      next: (data) => {
        this.pqrsList = data;
        console.log('Datos cargados:', this.pqrsList);
      },
      error: (err) => {
        console.error('Error al cargar los datos de PQRS:', err);
      },
    });
  }

  getPQRSByTipo(tipo: string | null) {
    if (!tipo) return [];

    return this.pqrsList.filter(
      (pqrs) => pqrs.typeReport?.name?.toLowerCase() === tipo.toLowerCase()
    );
  }

  toggleRespuesta(uuid: string) {
    this.visibleResponseBox[uuid] = !this.visibleResponseBox[uuid];
  }

  enviarRespuesta(pqrs: any) {
    console.log('Respuesta enviada:', pqrs.respuesta, 'para PQRS ID:', pqrs.id);
    this.visibleResponseBox[pqrs.id] = false;
  }
  tiposMap: { [key: string]: string } = {
    service: 'Servicios',
    claims: 'Reclamos',
    complaint: 'Quejas',
    petition: 'Peticiones',
    suggestion: 'Sugerencias',
  };
  toggleTipo(tipo: string) {
    this.tipoExpandido = this.tipoExpandido === tipo ? null : tipo;
  }
}
