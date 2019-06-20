import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];


@NgModule({
  imports: [
  FormsModule,
  AlertModule.forRoot(),
  RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule  { 
	
}
