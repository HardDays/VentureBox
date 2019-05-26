import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SystemComponent } from './system.component';

const routes: Routes =
[
    { path: '', redirectTo: 'main', pathMatch: 'full'},
    { path: '', component: SystemComponent, children:
        [
            { path: 'main', component: MainComponent}
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
