import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceProxyModule } from './shared/services/service-proxy.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NgxLoadingXModule } from 'ngx-loading-x';
import { AppConsts } from './shared/app-consts';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { NgxSidePanelsModule } from 'ngx-side-panels';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentBase } from './shared/component-base';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbModalModule,
    HttpClientModule,
    ServiceProxyModule,
    SharedModule.forRoot(),
    NgxLoadingXModule.forRoot(AppConsts.ngxLoadingXConfig),
    NgxSidePanelsModule.forRoot(),
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'},
    CurrencyPipe,
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
