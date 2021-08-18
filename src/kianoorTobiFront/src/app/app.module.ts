import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceProxyModule } from './shared/services/service-proxy.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NgxLoadingXModule } from 'ngx-loading-x';
import { AppConsts } from './shared/app-consts';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ServiceProxyModule,
    SharedModule.forRoot(),
    NgxLoadingXModule.forRoot(AppConsts.ngxLoadingXConfig),
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
