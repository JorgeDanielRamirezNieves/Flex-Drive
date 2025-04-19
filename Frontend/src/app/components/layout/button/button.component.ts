import { Component, Input } from '@angular/core';

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
  constructor() {
    this.label = 'Button Link';
    this.redirecTo = 'null';
    this.type = 'link';
  }

  public handleClick(): void {
    // Implement the logic to handle the button click here
    // For example, you can navigate to a different route using Angular Router
    console.log(`Button clicked! Redirecting to ${this.redirecTo}`);
    // You can use Angular Router to navigate to the specified route
    // this.router.navigate([this.redirecTo]);
  }
}
