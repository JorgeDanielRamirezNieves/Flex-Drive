import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-settings',
  standalone: false,
  templateUrl: './card-settings.component.html',
  styleUrl: './card-settings.component.css',
})
export class CardSettingsComponent {
  @Input() card: any;

  iconToggle = false;
  textToggle = false;
}
