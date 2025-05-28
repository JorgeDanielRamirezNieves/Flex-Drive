import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-pqrs',
  standalone: false,
  templateUrl: './pqrs.component.html',
  styleUrl: './pqrs.component.css',
})
export class PqrsComponent {
  formData: any = {
    idTypeReport: '',
    description: '',
    idService: '',
  };
  public token: any;
  public idUser: string;
  constructor(private router: Router, private reportsService: ReportsService) {
    this.token = jwtDecode(localStorage.getItem('authToken') || '');
    this.idUser = this.token.uuid;
  }
  submitted: boolean = false;

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (form.invalid) {
      console.warn('Formulario inválido. Por favor completa todos los campos.');
      return;
    }

    this.reportsService

      .postReport(
        this.formData.idTypeReport,
        this.formData.description,
        this.formData.idService,
        this.idUser
      )
      .subscribe({
        next: (respuesta) => {
          if (respuesta) {
            // this.router.navigate(['/landing']);
            console.log('id_typepqrs', this.formData.idTypeReport);
            console.log('description', this.formData.description);
            console.log('id_service', this.formData.idService);
            console.log('id_User', this.idUser);
          } else {
            console.log('faltan datos');
            console.log('id_User', this.idUser);
          }
        },
      });
  }
}
