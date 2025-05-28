import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesFormComponent } from './components/preferences-form/preferences-form.component';
import { SharedModule } from '../../shared/shared.module';
import { PreferenceRountingModule } from './preference-rounting.module';



@NgModule({
  declarations: [
    PreferencesFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PreferenceRountingModule
  ]
})
export class PreferencesModule { }
