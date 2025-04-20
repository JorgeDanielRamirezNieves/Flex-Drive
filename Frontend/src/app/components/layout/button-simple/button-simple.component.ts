import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-button-simple',
  standalone: false,
  templateUrl: './button-simple.component.html',
  styleUrl: './button-simple.component.css',
})
export class ButtonSimpleComponent {
  @Input() public label: string = 'Button Link';
  @Input() public redirecTo: string = '';
  @Input() public type: string = 'link';

  constructor(private router: Router) {}

  public handleClick(): void {
    if (this.redirecTo) {
      this.router.navigate([this.redirecTo]);
    }
  }
}
