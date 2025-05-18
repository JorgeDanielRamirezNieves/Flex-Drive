import { Component } from '@angular/core';

@Component({
  selector: 'app-view-all',
  standalone: false,
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css',
})
export class ViewAllComponent {
  public requests: any[];
  public selectedRequest: any | null = null;
  public loadingRequests: boolean;

  constructor() {
    this.requests = [
      {
        id: 1,
        status: 'Pending',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.',
        sendDate: '2023-10-01',
        responseDate: '2023-10-02',
        vehicle: 'Car',
        driver: 'John Doe',
        pickupDate: '2023-10-03',
        returnDate: '2023-10-04',        
      },
      {
        id: 2,
        status: 'Approved',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.',
        sendDate: '2023-10-05',
        responseDate: '2023-10-06',
        vehicle: 'Truck',
        driver: 'Jane Smith',
        pickupDate: '2023-10-07',
        returnDate: '2023-10-08',        
      },
      {
        id: 3,
        status: 'Rejected',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.',
        sendDate: '2023-10-09',
        responseDate: '2023-10-10',
        vehicle: 'Van',
        driver: 'Alice Johnson',
        pickupDate: '2023-10-11',
        returnDate: '2023-10-12',        
      },
      {
        id: 4,
        status: 'Pending',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.',
        sendDate: '2023-10-13',
        responseDate: '2023-10-14',
        vehicle: 'Bus',
        driver: 'Bob Brown',
        pickupDate: '2023-10-15',
        returnDate: '2023-10-16',        
      },
      {
        id: 5,
        status: 'unseen',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.',
        sendDate: '2023-10-17',
        responseDate: '2023-10-18',
        vehicle: 'Motorcycle',
        driver: 'Charlie Davis',
        pickupDate: '2023-10-19',
        returnDate: '2023-10-20',        
      },
    ];
    this.loadingRequests = false;
  }
}
