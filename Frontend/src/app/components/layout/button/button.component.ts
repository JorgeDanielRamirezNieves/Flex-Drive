import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() public label: string;
  @Input() public redirecTo: string;
  @Input() public type: string;
  @Input() public icon: string;
  @Input() public iconPos: 'left' | 'right' | 'top' | 'bottom'; 
  constructor(private router: Router) {
    this.label = 'Button Link';
    this.redirecTo = 'null';
    this.type = 'link';
    this.icon = '';
    this.iconPos = 'left'; 
  }

  

  public handleClick(): void {
    if (this.redirecTo) {
      this.router.navigate([this.redirecTo]);
    }
  }
}
