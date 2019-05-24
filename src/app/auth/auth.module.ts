import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthComponent } from './auth.component';
import { AuthAccessGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth.routing';
import { PasswordComponent } from './password/password.component';
import { SignUpComponent } from './singup/signup.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    PasswordComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    AuthRoutingModule
  ],
  providers: [ AuthAccessGuard]
})
export class AuthModule {}