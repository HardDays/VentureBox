import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StartupsAccessGuard } from './startups.guard';
import { StartupsComponent } from './startups.component';
import { StartupsRoutingModule } from './startups.routing';
import { StartupsListsComponent } from './lists/lists.component';
import { StartupsProfileComponent } from './profile/profile.component';
import { StartupsMyProfileComponent } from './my-profile/my-profile.component';
import { StartupsEditComponent } from './edit/edit.component';
import { TextMaskModule } from 'angular2-text-mask';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
      StartupsComponent,
      StartupsListsComponent,
      StartupsProfileComponent,
      StartupsMyProfileComponent,
      StartupsEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    StartupsRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    InfiniteScrollModule,
    MyDatePickerModule
  ],
  providers: [
       StartupsAccessGuard
   ]
})
export class StartupsModule {}
