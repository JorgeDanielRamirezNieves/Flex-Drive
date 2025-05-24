import { catchError, finalize, map, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { observatorAny } from '../../../../core/tipo-any';
import { PreferencesService } from '../../services/preferences.service';
import { Preferences } from '../../models/preferences';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profilesettings',
  standalone: false,
  templateUrl: './profilesettings.component.html',
  styleUrl: './profilesettings.component.css',
})
export class ProfilesettingsComponent implements OnInit, OnDestroy {
  public userUUID: string;
  public role: string;
  public subcription: Subscription;
  public tmp: any;
  public token: any;
  public preferences: Preferences | undefined;
  public complete: boolean = false;
  public cards: any[];

  constructor(private preferencesService: PreferencesService) {
    this.token = jwtDecode(localStorage.getItem('authToken') || '');
    this.role = this.token.rolUser.name;
    this.userUUID = this.token.uuid;
    this.subcription = this.tmp;
    this.cards = [
      {
        title: 'Notificaciones',
        description:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur a',
        imageS: '../../../../assets/icons/notificacion.png',
        toggle: {
          type: 'text',
          labels: ['Si', 'No'],
          value: this.preferences?.configurations.notifications,
        },
        // toggle: { type: 'simple', value: false }, // Simple toggle sin texto ni iconos
      },
      {
        title: 'Correos',
        description:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur a',
        imageS: '../../../../assets/icons/correo.png',
        toggle: { type: 'text', labels: ['Si', 'No'], value: this.preferences?.configurations.mails },
      },
      {
        title: 'Tema',
        description:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur a',
        imageS: '../../../../assets/icons/solLuna.png',
        buttonLabel: 'Adquirir Plan',
        toggle: {
          type: 'icon',
          icons: [
            '../../../../assets/icons/sol.png',
            '../../../../assets/icons/luna.png',
          ],
          value: this.preferences?.configurations.theme,
        },
      },
      {
        title: 'Idioma',
        description:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur a',
        imageS: '../../../../assets/icons/idioma.png',
        toggle: { type: 'text', labels: ['Esp', 'Eng'], value: this.preferences?.configurations.language },
      },
      {
        title: 'Eliminar chats',
        description:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur a',
        imageS: '../../../../assets/icons/mensaje.png',
        toggle: { type: 'text', labels: ['Si', 'No'], value: this.preferences?.configurations.deleteChats },
      },
    ];
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getPreferences();
  }

  private getPreferences() {
    this.subcription = this.preferencesService
      .getPreferencesUser(this.userUUID)
      .pipe(
        map((res: any) => {
          this.preferences = res;
        }),
        catchError((err) => {
          throw new Error(err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }
}
