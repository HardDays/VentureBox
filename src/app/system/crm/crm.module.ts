import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CrmRoutingModule } from './crm.routing';
import { CrmComponent } from './crm.component';

@NgModule({
  declarations: [
      CrmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    CrmRoutingModule
  ],
  providers: [
  ]
})
export class CrmModule {}
