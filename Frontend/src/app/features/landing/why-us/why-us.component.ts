import { Component } from '@angular/core';

@Component({
  selector: 'app-why-us',
  standalone: false,
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.css'
})
export class WhyUsComponent {
  constructor() { 
    window.scrollTo(0, 0);
  }
}
