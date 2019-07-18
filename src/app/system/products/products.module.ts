import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ProductsAccessGuard } from './products.guard';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products.routing';
import { ProductsListsComponent } from './lists/lists.component';
import { ProductsEditComponent } from './edit/edit.component';
import { ProductsCreateComponent } from './create/create.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { PipesModule } from '../../core/pipes/pipes.module';
import { Preloader2Component } from './../../core/preloader2/preloader.component';

@NgModule({
  declarations: [
      ProductsComponent,
      ProductsListsComponent,
      ProductsEditComponent,
      ProductsCreateComponent,
      SingleProductComponent,
      Preloader2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [
      ProductsAccessGuard
  ],
  exports:[
    SingleProductComponent
  ]
})
export class ProductsModule {}
