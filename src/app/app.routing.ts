import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppAccessGuard } from './app.guard';
import { AuthComponent } from './auth/auth.component';
import { AuthAccessGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'system', pathMatch: 'full'},
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canActivate:[AppAccessGuard]},
    { path: 'system', loadChildren: './system/system.module#SystemModule',canActivate:[AppAccessGuard]}
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
