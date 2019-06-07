import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartupsComponent } from './startups.component';
import { StartupsListsComponent } from './lists/lists.component';
import { StartupsProfileComponent } from './profile/profile.component';
import { StartupsMyProfileComponent } from './my-profile/my-profile.component';
import { StartupsAccessGuard } from './startups.guard';
import { StartupsEditComponent } from './edit/edit.component';

const routes: Routes =
[
    { path: '', redirectTo: 'lists', pathMatch: 'full'},
    { path: '', component: StartupsComponent, children:
        [
          { path: "", pathMatch:"full", redirectTo: "lists"},
          { path: 'lists', component: StartupsListsComponent, canActivate:[StartupsAccessGuard]},
          { path: 'my-profile', component: StartupsMyProfileComponent, canActivate:[StartupsAccessGuard]},
          { path: 'profile/:id', component: StartupsProfileComponent, canActivate:[StartupsAccessGuard]},
          { path: 'edit', component: StartupsEditComponent, canActivate:[StartupsAccessGuard]},
          // { path: '**', redirectTo: "lists", canActivate:[ProductsAccessGuard]}
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
export class StartupsRoutingModule { }
