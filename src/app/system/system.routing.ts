import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SystemComponent } from './system.component';
import { SystemAccessGuard } from './system.guard';
import { NewsComponent } from './news/news.component';
import { ProductDetailComponent } from './product_detail/product_detail.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes =
[
    { path: '', component: SystemComponent, children:
        [
          { path: "", pathMatch:"full", redirectTo: "my_products"},
          {path: 'my_products', loadChildren: './products/products.module#ProductsModule',canActivate:[SystemAccessGuard]},
          {
            path: "my_news", component: NewsComponent, canActivate:[SystemAccessGuard]
          },
          {
            path: "my_milestones", loadChildren: './milestones/milestones.module#MilestonesModule', canActivate:[SystemAccessGuard]
          },
          {
            path: "my_investors", loadChildren: './my_investors/my_investors.module#MyInvestorsModule', canActivate:[SystemAccessGuard]
          },
          {
            path: "startups", loadChildren: './startups/startups.module#StartupsModule', canActivate:[SystemAccessGuard]
          },
          {
            path: 'products/:id', component: ProductDetailComponent
          },
          {
            path: 'settings', component: SettingsComponent, canActivate: [SystemAccessGuard]
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
