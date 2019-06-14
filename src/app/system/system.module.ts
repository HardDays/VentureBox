import { PortfolioComponent } from './portfolio/portfolio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SystemRoutingModule } from './system.routing';
import { SystemAccessGuard } from './system.guard';
import { SystemComponent } from './system.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NewsComponent } from './news/news.component';
import { ProductDetailComponent } from './product_detail/product_detail.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    SystemComponent,
    MainComponent,
    NavigationComponent,
    NewsComponent,
    ProductDetailComponent,
    SettingsComponent,
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    SystemRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ SystemAccessGuard]
})
export class SystemModule {}
