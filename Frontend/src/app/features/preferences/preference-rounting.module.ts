import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreferencesFormComponent } from './components/preferences-form/preferences-form.component';



const routes: Routes = [
  {
    path: '',
    component: PreferencesFormComponent, // Assuming you have a main preferences form component
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PreferenceRountingModule { }
