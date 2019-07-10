import { TextMaskModule } from 'angular2-text-mask';
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
import { MyDatePickerModule } from 'mydatepicker';

import {
    GoogleApiModule,
    GoogleApiService,
    GoogleAuthService,
    NgGapiClientConfig,
    NG_GAPI_CONFIG,
    GoogleApiConfig
} from "ng-gapi";
import { GoogleService } from '../core/services/google.service';
import { TrackingComponent } from './tracking/tracking.component';

let gapiClientConfig: NgGapiClientConfig = {
    client_id: "261425662871-9kivhka8a8ts4vmrhj0fk93u1rauu7p4.apps.googleusercontent.com",
    discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
    scope: [
        "https://www.googleapis.com/auth/calendar.events.readonly",
        "https://www.googleapis.com/auth/calendar.readonly"
    ].join(" ")
};

@NgModule({
  declarations: [
    SystemComponent,
    MainComponent,
    NavigationComponent,
    NewsComponent,
    ProductDetailComponent,
    SettingsComponent,
    PortfolioComponent,
    TrackingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    SystemRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    MyDatePickerModule
  ],
  providers: [ SystemAccessGuard, GoogleService]
})
export class SystemModule {}
