import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() public label: string = 'Button Link';
  @Input() public redirecTo: string = '';
  @Input() public type: 'link' | 'button' | 'submit' = 'link';
  @Input() public icon?: string;
  @Input() public iconPos: 'left' | 'right' = 'right';

  constructor(private router: Router) {}

  public handleClick(): void {
    if (this.redirecTo) {
      this.router.navigate([this.redirecTo]);
    }
  }
}
