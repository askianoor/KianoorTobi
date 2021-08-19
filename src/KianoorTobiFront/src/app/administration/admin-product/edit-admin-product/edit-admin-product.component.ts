import { Component, Injector, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogComponentBase } from 'src/app/shared/dialog-component-base';
import { ProductType } from 'src/app/shared/enums/product-type.enum';
import { ProductAddDto, ProductEditDto, ProductOutputDto } from 'src/app/shared/models/product';
import { ProductCategoryOutputDto } from 'src/app/shared/models/product-category';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { SaveNewProduct } from 'src/app/shared/stores/actions/product.action';
import { AppState } from 'src/app/shared/stores/app-state';
import { IProductInitiali } from 'src/app/shared/stores/reducers/product.reducer';

@Component({
  selector: 'app-edit-admin-product',
  templateUrl: './edit-admin-product.component.html',
  styleUrls: ['./edit-admin-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditAdminProductComponent extends DialogComponentBase<ProductOutputDto, ProductAddDto, ProductEditDto> {

  itemModel = new ProductOutputDto();
  itemCreateModel!: ProductAddDto;
  itemUpdateModel!: ProductEditDto;
  public productType = ProductType;
  categories!: ProductCategoryOutputDto[];
  isPriceDisabled = true;
  saving$: Observable<boolean>;
  productState$: Observable<IProductInitiali>;
  constructor(injector: Injector,
              private store: Store,
              private productService: ProductService,
              private productCategoryService: ProductCategoryService) {
    super(injector);

    this.productState$ = this.store.pipe(
      select((appState: any) => appState.product)
      ,map(res => res)
      );
      this.saving$ = this.productState$.pipe(map(res => res.saving as boolean));
  }

  protected populateOnAdd(finishedCallback: Function): void {
    this.populateProductCategories('');
    finishedCallback();
  }

  protected populateOnEdit(finishedCallback: Function): void {
    this.populateProductCategories('');
    this.productService.getProductById(this.id).subscribe((res: any) => {
      this.itemModel = res;
      this.isPriceDisabled = false;
      finishedCallback();
    });
  }

  private beforeSave(): void {
    this.itemModel.type = +this.itemModel.type;
    this.itemCreateModel = this.itemModel as any;
    this.itemUpdateModel = this.itemModel as any;
  }

  protected createNew(finishedCallback: Function): void {
    this.beforeSave();
    this.store.dispatch(SaveNewProduct({payload: this.itemCreateModel}));
  }

  protected update(finishedCallback: Function): void {
    this.beforeSave();
    this.productService.updateProduct(this.itemUpdateModel).subscribe((result: any) => {
      finishedCallback(result);
    }, (err: any) => {
      this.saving = false;
    });
  }

  populateProductCategories(name: string): void {
    this.productCategoryService.getProductCategories().subscribe(res => {
      this.categories = res;
    })
  }

  productTypeChanged(typeId: any) {
    this.isPriceDisabled = !(typeId == 1 || typeId == 2);
  }
  compareWithFn = (v1: any, v2: any) => {
    return v1 == v2;
  }
}

