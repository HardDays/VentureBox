import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MyInvestorsAccessGuard } from './my_investors.guard';
import { MyInvestorsComponent } from './my_investors.component';
import { MyInvestorsRoutingModule } from './my_investors.routing';
import { MyInvestorsListsComponent } from './lists/lists.component';
import { MyDatePickerModule } from 'mydatepicker';


@NgModule({
  declarations: [
      MyInvestorsComponent,
      MyInvestorsListsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    MyInvestorsRoutingModule,
    MyDatePickerModule
  ],
  providers: [
      MyInvestorsAccessGuard
   ]
})
export class MyInvestorsModule {}
