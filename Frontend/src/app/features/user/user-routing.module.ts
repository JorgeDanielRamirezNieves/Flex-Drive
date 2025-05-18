import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { ProfilesettingsComponent } from './components/profilesettings/profilesettings.component';
import { PqrsComponent } from '../reports/components/pqrs/pqrs.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'register', component: RegisterComponent },
  { path: 'editprofile', component: EditprofileComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  {
    path: 'activechats',
    loadChildren: () =>
      import('../chat/chat.module').then((m) => m.ChatModule),
  },
  { path: 'profilesettings', component: ProfilesettingsComponent },
  { path: 'pqrs', component: PqrsComponent },
  { path: '', component: UserComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
