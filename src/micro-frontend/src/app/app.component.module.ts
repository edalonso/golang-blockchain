import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export const FLIGHTS_ROUTES: Routes = [
  {
    path: '',
    component: AppComponent
  }
];

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(FLIGHTS_ROUTES),
    MatIconModule,
    MatButtonModule
  ],

})
export class AppComponentModule { }
