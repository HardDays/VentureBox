import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SystemRoutingModule } from './system.routing';
import { SystemAccessGuard } from './system.guard';
import { SystemComponent } from './system.component';


@NgModule({
  declarations: [
    SystemComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    SystemRoutingModule
  ],
  providers: [ SystemAccessGuard]
})
export class SystemModule {}