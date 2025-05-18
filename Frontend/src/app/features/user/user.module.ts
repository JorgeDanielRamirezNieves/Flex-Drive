import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSettingsComponent } from './components/card-settings/card-settings.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { ProfilesettingsComponent } from './components/profilesettings/profilesettings.component';
import { RegisterComponent } from './components/register/register.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SubscriptionsCardComponent } from './components/subscriptions-card/subscriptions-card.component';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    CardSettingsComponent,
    EditprofileComponent,
    ProfilesettingsComponent,
    RegisterComponent,
    SubscriptionsComponent,
    SubscriptionsCardComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
