import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-pqrs',
  standalone: false,
  templateUrl: './pqrs.component.html',
  styleUrl: './pqrs.component.css',
})
export class PqrsComponent {
  formData: any = {
    typePQRS: '',
    description: '',
    idService: '',
  };
  constructor(private router: Router, private reportsService: ReportsService) {}

  submitted: boolean = false;

  onSubmit(form: NgForm): void {
    this.submitted = true;
    this.reportsService
      .postReport(
        this.formData.typePQRS,
        this.formData.description,
        this.formData.idService
      )
      .subscribe({
        next: (respuesta) => {
          if (respuesta) {
            this.router.navigate(['/landing']);
            console.log('id_typepqrs', this.formData.typePQRS);
            console.log('description', this.formData.description);
            console.log('id_service', this.formData.idService);
          } else {
            console.log('faltan datos');
          }
        },
      });
  }
}
