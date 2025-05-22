import { Component } from '@angular/core';
import { User } from './features/user/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'Frontend';

  constructor() {
    // const userUUID ="6bc2ec32-4ed6-47ba-a23e-12280ea0477d"
    // const role = "owner"
    // localStorage.setItem('userUUID', userUUID);
    // localStorage.setItem('role', role);
  }
}
