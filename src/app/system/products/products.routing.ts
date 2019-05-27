import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductsListsComponent } from './lists/lists.component';
import { ProductsCreateComponent } from './create/create.component';
import { ProductsEditComponent } from './edit/edit.component';

const routes: Routes =
[
    { path: '', redirectTo: 'lists', pathMatch: 'full'},
    { path: '', component: ProductsComponent, children:
        [
          { path: "", pathMatch:"full", redirectTo: "lists"},
          { path: 'lists', component: ProductsListsComponent},
          { path: 'create', component: ProductsCreateComponent},
          { path: 'edit/:id', component: ProductsEditComponent},
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
export class ProductsRoutingModule { }
