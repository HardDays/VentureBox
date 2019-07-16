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
import { TextMaskModule } from 'angular2-text-mask';
import { PreloaderComponent } from '../core/preloader/preloader.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    PasswordComponent,
    SignUpComponent,
    PreloaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    TextMaskModule
  ],
  providers: [ AuthAccessGuard]
})
export class AuthModule {}
