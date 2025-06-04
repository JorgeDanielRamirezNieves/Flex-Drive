import { Component } from '@angular/core';

@Component({
  selector: 'app-activechats',
  standalone: false,
  templateUrl: './activechats.component.html',
  styleUrl: './activechats.component.css',
})
export class ActivechatsComponent {
  constructor() {
    window.scrollTo(0, 0)
  }
}
