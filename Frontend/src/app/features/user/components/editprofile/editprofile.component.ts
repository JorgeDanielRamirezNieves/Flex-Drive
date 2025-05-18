import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-editprofile',
  standalone: false,
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css',
})
export class EditprofileComponent {
  selectedDocument: string = 'cc';

  constructor(private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Formulario válido. Redirigiendo...');
      this.router.navigate(['/landing']);
    } else {
      console.log('Formulario inválido');
    }
  }
}
