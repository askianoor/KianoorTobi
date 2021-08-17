import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceProxyModule } from './shared/services/service-proxy.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NgxLoadingXModule } from 'ngx-loading-x';
import { AppConsts } from './shared/app-consts';
import { HttpClientModule } from '@angular/common/http';

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
    NgxLoadingXModule.forRoot(AppConsts.ngxLoadingXConfig),
  ],
  exports: [
    NavbarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
