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
  public email: string;
  constructor(private router: Router, private reportsService: ReportsService) {
    this.token = jwtDecode<any>(localStorage.getItem('authToken') || '');

    this.email = this.token.email;
    window.scrollTo(0, 0)
    this.idUser = this.token.uuid;
  }
  submitted: boolean = false;
  showDialog = false;
  confirmationDialog = '';
  errorMsg: string = '';
  errorIMg: string = '';

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (form.invalid) {
      console.warn('Formulario inválido. Por favor completa todos los campos.');
      return;
    }
    const idServiceToSend = this.formData.idService?.trim() || null;

    this.reportsService
      .postReport(
        this.formData.idTypeReport,
        this.formData.description,
        idServiceToSend,
        this.idUser
      )
      .subscribe({
        next: (respuesta) => {
          if (respuesta.status != 500) {
            this.showDialog = true;
            this.confirmationDialog = `Tu PQRS fue enviada correctamente. Gracias por contactarte con Flex Drive. Nos comunicaresmos contigo lo más pronto posible a tu dirección correo electrónico: ${this.email}`;

            form.resetForm();
          } else {
            this.showDialog = true;
            (this.errorMsg =
              'Error: El ID del servicio es inválido o no existe. Por favor verifica.'),
              (this.errorIMg = '../../../../assets/icons/CaraTriste.png');
          }
        },
      });
  }

  closeDialog(form: NgForm) {
    this.showDialog = false;
    this.submitted = false;
  }
}
