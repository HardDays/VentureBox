import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SystemComponent } from './system.component';
import { SystemAccessGuard } from './system.guard';

const routes: Routes =
[
    { path: '', redirectTo: 'my_products', pathMatch: 'full'},
    { path: '', component: SystemComponent, children:
        [
          { path: "", pathMatch:"full", redirectTo: "my_products"},
          {path: 'my_products', loadChildren: './products/products.module#ProductsModule',canActivate:[SystemAccessGuard]},
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
