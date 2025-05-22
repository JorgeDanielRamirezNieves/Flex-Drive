import { Component } from '@angular/core';
import { User } from './features/user/models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'Frontend';

  constructor() {
    const userUUID ="7178411f-2784-423f-b754-838b9d6be2e3" 
    const role = "user" 
    localStorage.setItem('userUUID', userUUID);     
    localStorage.setItem('role', role);
  }
}
