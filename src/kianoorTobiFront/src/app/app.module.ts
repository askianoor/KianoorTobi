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
import { StoreModule } from '@ngrx/store';
import { EffectsModule, USER_PROVIDED_EFFECTS } from '@ngrx/effects';
import { ProductEffects } from './shared/stores/effects/product.effects';
import { productReducer } from './shared/stores/reducers/product.reducer';

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
    StoreModule.forRoot({
      product: productReducer
    }, {}),
    EffectsModule.forRoot([ProductEffects]),
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'},
    CurrencyPipe,
    NgbActiveModal,
    ProductEffects,
    {
      provide: USER_PROVIDED_EFFECTS,
      multi: true,
      useValue: [ProductEffects],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
