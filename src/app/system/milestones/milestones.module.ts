import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MilestonesAccessGuard } from './milestones.guard';
import { MilestonesComponent } from './milestones.component';
import { MilestonesRoutingModule } from './milestones.routing';
import { MilestonesListsComponent } from './lists/lists.component';
import { MilestonesEditComponent } from './edit/edit.component';
import { MilestonesCreateComponent } from './create/create.component';
import { MilestonesListItemComponent } from './lists/milestones-list-item/milestones-list-item.component';


@NgModule({
  declarations: [
      MilestonesComponent,
      MilestonesListsComponent,
      MilestonesEditComponent,
      MilestonesCreateComponent,
      MilestonesListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    MilestonesRoutingModule
  ],
  providers: [
      MilestonesAccessGuard
   ]
})
export class MilestonesModule {}
