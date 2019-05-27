import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ProductsAccessGuard } from './products.guard';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products.routing';
import { ProductsListsComponent } from './lists/lists.component';
import { ProductsEditComponent } from './edit/edit.component';
import { ProductsCreateComponent } from './create/create.component';


@NgModule({
  declarations: [
      ProductsComponent,
      ProductsListsComponent,
      ProductsEditComponent,
      ProductsCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ProductsRoutingModule
  ],
  providers: [
      ProductsAccessGuard
   ]
})
export class ProductsModule {}