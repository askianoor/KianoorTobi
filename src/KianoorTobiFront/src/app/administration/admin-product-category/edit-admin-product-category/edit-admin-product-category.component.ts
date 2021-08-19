import { Component, Injector, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogComponentBase } from 'src/app/shared/dialog-component-base';
import { ProductCategoryAddDto, ProductCategoryEditDto, ProductCategoryOutputDto } from 'src/app/shared/models/product-category';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';

@Component({
  selector: 'app-edit-admin-product-category',
  templateUrl: './edit-admin-product-category.component.html',
  styleUrls: ['./edit-admin-product-category.component.scss']
})
export class EditAdminProductCategoryComponent extends DialogComponentBase<ProductCategoryOutputDto, ProductCategoryAddDto, ProductCategoryEditDto> {

  itemModel = new ProductCategoryOutputDto();
  itemCreateModel!: ProductCategoryAddDto;
  itemUpdateModel!: ProductCategoryEditDto;

  constructor(injector: Injector, private productCategoryService: ProductCategoryService) {
    super(injector);
  }

  protected populateOnAdd(finishedCallback: Function): void {
    finishedCallback();
  }

  protected populateOnEdit(finishedCallback: Function): void {
    this.productCategoryService.getProductCategoryById(this.id).subscribe((res: any) => {
      this.itemModel = res;
      finishedCallback();
    });
  }

  private beforeSave(): void {
    this.itemCreateModel = this.itemModel as any;
    this.itemUpdateModel = this.itemModel as any;
  }

  protected createNew(finishedCallback: Function): void {
    this.beforeSave();
    this.productCategoryService.addProductCategory(this.itemCreateModel).subscribe((result: any) => {
      finishedCallback(result);
    }, (err: any) => {
      this.saving = false;
    });
  }

  protected update(finishedCallback: Function): void {
    this.beforeSave();
    this.productCategoryService.updateProductCategory(this.itemUpdateModel).subscribe((result: any) => {
      finishedCallback(result);
    }, (err: any) => {
      this.saving = false;
    });
  }

}

