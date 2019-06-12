import { MyInvestorsListsComponent } from './lists/lists.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyInvestorsComponent } from './my_investors.component';


const routes: Routes =
[
    { path: '', redirectTo: 'lists', pathMatch: 'full'},
    { path: '', component: MyInvestorsComponent, children:
        [
          { path: "", pathMatch:"full", redirectTo: "lists"},
          { path: 'lists', component: MyInvestorsListsComponent},
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
export class MyInvestorsRoutingModule { }
