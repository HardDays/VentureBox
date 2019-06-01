import { NewsService } from './core/services/news.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppAccessGuard } from './app.guard';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app.routing';
import { AuthService } from './core/services/auth.service';
import { HttpService } from './core/services/http.service';
import { TypeService } from './core/services/type.service';
import { ProductsService } from './core/services/products.service';

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
    HttpClientModule
  ],
  providers: [
    AppAccessGuard,
    HttpModule,
    AuthService,
    HttpService,
    TypeService,
    NewsService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
