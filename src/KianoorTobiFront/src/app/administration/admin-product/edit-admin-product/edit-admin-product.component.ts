import { Component, Injector, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogComponentBase } from 'src/app/shared/dialog-component-base';
import { ProductAddDto, ProductEditDto, ProductOutputDto } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-edit-admin-product',
  templateUrl: './edit-admin-product.component.html',
  styleUrls: ['./edit-admin-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditAdminProductComponent extends DialogComponentBase<ProductOutputDto, ProductAddDto, ProductEditDto> {

  itemModel!: ProductOutputDto;
  itemCreateModel!: ProductAddDto;
  itemUpdateModel!: ProductEditDto;

  constructor(injector: Injector, private productService: ProductService) {
    super(injector);
    debugger;
  }

  protected populateOnAdd(finishedCallback: Function): void {
    finishedCallback();
  }

  protected populateOnEdit(finishedCallback: Function): void {

    this.productService.getProductById(this.id).subscribe((res: any) => {
      this.itemModel = res;
      finishedCallback();
    });
  }

  private beforeSave(): void {

  }

  protected createNew(finishedCallback: Function): void {
    this.beforeSave();
    this.productService.addProduct(this.itemCreateModel).subscribe((result: any) => {
      finishedCallback(result);
    }, (err: any) => {
      this.saving = false;
    });
  }

  protected update(finishedCallback: Function): void {
    this.beforeSave();
    this.productService.updateProduct(this.itemUpdateModel).subscribe((result: any) => {
      finishedCallback(result);
    }, (err: any) => {
      this.saving = false;
    });
  }

}

