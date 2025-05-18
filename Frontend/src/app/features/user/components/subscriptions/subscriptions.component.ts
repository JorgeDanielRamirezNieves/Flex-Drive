import { Component } from '@angular/core';

@Component({
  selector: 'app-subscriptions',
  standalone: false,
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css',
})
export class SubscriptionsComponent {
  cards = [
    {
      title: 'Plan Flex 1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur a',
      price: '$ 120.000 /año',
      image: '../../../../assets/numero-1.png',
      buttonLabel: 'Adquirir Plan',
    },
    {
      title: 'Plan Flex 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur a',
      price: '$ 150.000 /año',
      image: '../../../../assets/numero-2.png',
      buttonLabel: 'Adquirir Plan',
    },
    {
      title: 'Plan Flex 3',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur a',
      price: '$ 180.000 / año',
      image: '../../../../assets/numero-3.png',
      buttonLabel: 'Adquirir Plan',
    },
  ];
}
