import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminProductCategoryComponent } from './admin-product-category/admin-product-category.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { TobiTableModule } from '../shared/components/tobi-table/tobi-table.module';

@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    TobiTableModule,
  ],
  declarations: [
    AdministrationComponent,
    AdminProductComponent,
    AdminProductCategoryComponent
  ],
  exports: [
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
