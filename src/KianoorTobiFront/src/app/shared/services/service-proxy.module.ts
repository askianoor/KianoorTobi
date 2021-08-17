import {NgModule} from '@angular/core';
import {NgxLoadingService} from './ngx-loading.service';
import { ProductCategoryService } from './product-category.service';
import { ProductService } from './product.service';
// import {HTTP_INTERCEPTORS} from '@angular/common/http';
// import {ErrorHandling} from './error-handling.Interceptor';

@NgModule({
  providers: [
    NgxLoadingService,
    ProductService,
    ProductCategoryService,
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorHandling, multi: true},
  ]
})
export class ServiceProxyModule { }
