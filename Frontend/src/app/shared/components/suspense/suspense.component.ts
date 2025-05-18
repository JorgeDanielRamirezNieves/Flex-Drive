import { Component, ViewChild } from '@angular/core';
import { Drawer } from 'primeng/drawer';

@Component({
  selector: 'app-suspense',
  standalone: false,
  templateUrl: './suspense.component.html',
  styleUrl: './suspense.component.css',
})
export class SuspenseComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e:any): void {
    this.drawerRef.close(e);
  }
}
