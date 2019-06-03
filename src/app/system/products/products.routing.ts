import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductsListsComponent } from './lists/lists.component';
import { ProductsCreateComponent } from './create/create.component';
import { ProductsEditComponent } from './edit/edit.component';
import { ProductsAccessGuard } from './products.guard';

const routes: Routes =
[
    { path: '', redirectTo: 'lists', pathMatch: 'full'},
    { path: '', component: ProductsComponent, children:
        [
          { path: "", pathMatch:"full", redirectTo: "lists"},
          { path: 'lists', component: ProductsListsComponent, canActivate:[ProductsAccessGuard]},
          { path: 'create', component: ProductsCreateComponent, canActivate:[ProductsAccessGuard]},
          { path: 'edit/:id', component: ProductsEditComponent, canActivate:[ProductsAccessGuard]},
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
export class ProductsRoutingModule { }
