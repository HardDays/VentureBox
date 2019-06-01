import { MilestonesEditComponent } from './edit/edit.component';
import { MilestonesCreateComponent } from './create/create.component';
import { MilestonesListsComponent } from './lists/lists.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MilestonesComponent } from './milestones.component';


const routes: Routes =
[
    { path: '', redirectTo: 'lists', pathMatch: 'full'},
    { path: '', component: MilestonesComponent, children:
        [
          { path: "", pathMatch:"full", redirectTo: "lists"},
          { path: 'lists', component: MilestonesListsComponent},
          { path: 'create', component: MilestonesCreateComponent},
          { path: 'edit/:id', component: MilestonesEditComponent},
          { path: '**', redirectTo: "lists"}
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
export class MilestonesRoutingModule { }
