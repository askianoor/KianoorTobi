import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {AdministrationComponent} from './administration.component';
import { AdminProductCategoryComponent } from './admin-product-category/admin-product-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { EditAdminProductComponent } from './admin-product/edit-admin-product/edit-admin-product.component';

const rouets: Route[] = [
  {
    path: '', component: AdministrationComponent, children: [
      {path: '', redirectTo: 'products'},
      {path: 'products', component: AdminProductComponent, children:[
        {path: 'editProduct', component: EditAdminProductComponent},
      ]},
      {path: 'productCategories', component: AdminProductCategoryComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(rouets)
  ],
  exports: [
    RouterModule
  ]
})
export class AdministrationRoutingModule {
}
