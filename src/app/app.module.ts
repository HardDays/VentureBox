import { NewsService } from './core/services/news.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { AppAccessGuard } from './app.guard';
import { AppRoutingModule } from './app.routing';
import { AuthService } from './core/services/auth.service';
import { HttpService } from './core/services/http.service';
import { TypeService } from './core/services/type.service';
import { ProductsService } from './core/services/products.service';
import { MilestonesService } from './core/services/milestones.service';
import { StartupsService } from './core/services/startups.service';


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    TextMaskModule,

  ],
  providers: [
    AppAccessGuard,
    HttpModule,
    AuthService,
    HttpService,
    TypeService,
    NewsService,
    ProductsService,
    MilestonesService,
    StartupsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);
