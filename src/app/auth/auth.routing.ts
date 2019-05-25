import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthAccessGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { PasswordComponent } from './password/password.component';
import { SignUpComponent } from './singup/signup.component';

const routes: Routes =
[
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: '', component: AuthComponent, children:
        [
            { path: 'login', component: LoginComponent},
            { path: 'remind', component: PasswordComponent},
            { path: 'signup', component: SignUpComponent}
        ]
    }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AuthRoutingModule { }
