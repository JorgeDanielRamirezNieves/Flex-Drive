import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subscriptions-card',
  standalone: false,
  templateUrl: './subscriptions-card.component.html',
  styleUrl: './subscriptions-card.component.css',
})
export class SubscriptionsCardComponent {
  @Input() card: any;
}
