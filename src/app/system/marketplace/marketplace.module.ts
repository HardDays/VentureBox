import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../core/pipes/pipes.module';
import { MarketplaceService } from './marketplace.service';
import { MarketplaceComponent } from './marketplace.component';
import { MarketplaceRoutingModule } from './marketplace.routing';
import { ProductsModule } from '../products/products.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
      MarketplaceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    PipesModule,
    MarketplaceRoutingModule,
    ProductsModule,
    InfiniteScrollModule
  ],
  providers: [
    MarketplaceService
  ]
})
export class MarketplaceModule {}