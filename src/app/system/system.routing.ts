import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SystemComponent } from './system.component';
import { SystemAccessGuard } from './system.guard';
import { NewsComponent } from './news/news.component';
import { ProductDetailComponent } from './product_detail/product_detail.component';
import { SettingsComponent } from './settings/settings.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes =
[
    { path: '', component: SystemComponent, children:
        [
          { path: "", pathMatch:"full", redirectTo: "crm"},
          {
            path: 'my_products', loadChildren: './products/products.module#ProductsModule',canActivate:[SystemAccessGuard], data: {role: 'startup', auth: true}
          },
          {
            path: "my_news", component: NewsComponent, canActivate:[SystemAccessGuard], data: {role: 'startup', auth: true}
          },
          {
            path: "my_milestones", loadChildren: './milestones/milestones.module#MilestonesModule', canActivate:[SystemAccessGuard], data: {role: 'startup', auth: true}
          },
          {
            path: "my_investors", loadChildren: './my_investors/my_investors.module#MyInvestorsModule', canActivate:[SystemAccessGuard], data: {role: 'startup', auth: true}
          },
          {
            path: "startups", loadChildren: './startups/startups.module#StartupsModule', canActivate:[SystemAccessGuard]
          },
          {
            path: 'products/:id', component: ProductDetailComponent
          },
          {
            path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [SystemAccessGuard], data: {auth: true}
          },
          {
            path: 'settings', component: SettingsComponent, canActivate: [SystemAccessGuard], data: {role: null, auth: true}
          },
          {
            path: 'portfolio', component: PortfolioComponent, canActivate: [SystemAccessGuard]
          },
          {
            path: 'crm', component: MainComponent
          },
          { path: '**', component: MainComponent}
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
export class SystemRoutingModule { }
