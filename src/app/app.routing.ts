import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppAccessGuard } from './app.guard';
import { AuthComponent } from './auth/auth.component';
import { AuthAccessGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch:'full'},
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
  ],
  providers: []
})
export class AppRoutingModule { }
