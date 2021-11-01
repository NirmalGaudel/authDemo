import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialUIModule } from '../material-ui/material-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent, SignupComponent, AuthComponent],
  imports: [RouterModule,FormsModule, ReactiveFormsModule, CommonModule, MaterialUIModule],
  exports: [LoginComponent, SignupComponent,AuthComponent],
})
export class AuthModule {}
