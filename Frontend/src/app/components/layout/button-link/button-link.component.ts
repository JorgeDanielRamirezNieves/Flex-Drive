import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-link',
  standalone: false,
  templateUrl: './button-link.component.html',
  styleUrl: './button-link.component.css'
})
export class ButtonLinkComponent {
  @Input() public label: string;
  @Input() public redirecTo: string;
  constructor(){
    this.label = 'Button Link';
    this.redirecTo = 'null';
  }
  
  public handleNavegate(): void {
    // Implement the logic to handle the button click here
    // For example, you can navigate to a different route using Angular Router
    console.log(`Button clicked! Redirecting to ${this.redirecTo}`);
    // You can use Angular Router to navigate to the specified route
    // this.router.navigate([this.redirecTo]);
  }
}
