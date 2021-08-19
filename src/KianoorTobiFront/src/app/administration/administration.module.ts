import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminProductCategoryComponent } from './admin-product-category/admin-product-category.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { TobiTableModule } from '../shared/components/tobi-table/tobi-table.module';
import { SharedModule } from '../shared/shared.module';
import { TobiFormModule } from '../shared/components/tobi-form/tobi-form.module';
import { EditAdminProductComponent } from './admin-product/edit-admin-product/edit-admin-product.component';
import { EditAdminProductCategoryComponent } from './admin-product-category/edit-admin-product-category/edit-admin-product-category.component';
import { FormsModule } from '@angular/forms';
import { productReducer } from '../shared/stores/reducers/product.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from '../shared/stores/effects/product.effects';

@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule,
    TobiTableModule,
    FormsModule,
    TobiFormModule,
    StoreModule.forFeature('appState', [productReducer]),
    EffectsModule.forFeature([ProductEffects])
  ],
  declarations: [
    AdministrationComponent,
    AdminProductComponent,
    EditAdminProductComponent,
    AdminProductCategoryComponent,
    EditAdminProductCategoryComponent
  ],
  exports: [
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
