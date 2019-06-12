import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InvestorDashboardComponent } from './investor/investor.component';
import { DashboardAccessGuard } from './dashboard.guard';
import { DashBoardRoutingModule } from './dasboard.routing';
import { StartupDashboardComponent } from './startup/startup.component';
import { InputModule } from 'src/app/core/inputs/inputs.module';
import { DashboardService } from './dashboard.service';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../../core/pipes/pipes.module';
import { DashboardNewsComponent } from './news/dashboard_news.component';

@NgModule({
  declarations: [
      DashboardComponent,
      InvestorDashboardComponent,
      StartupDashboardComponent,
      DashboardNewsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    DashBoardRoutingModule,
    InputModule,
    ChartsModule,
    PipesModule
  ],
  providers: [
    DashboardAccessGuard,
    DashboardService
  ]
})
export class DashboardModule {}
