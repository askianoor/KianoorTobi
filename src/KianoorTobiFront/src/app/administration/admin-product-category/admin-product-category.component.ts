import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSidePanelsService } from 'ngx-side-panels';
import { TobiTableColumn } from 'src/app/shared/components/tobi-table/tobi-table.component';
import { ProductCategoryOutputDto } from 'src/app/shared/models/product-category';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';
import { TableComponentBase } from 'src/app/shared/table-component-base';
import { SweetAlertResult } from 'sweetalert2';
import { EditAdminProductCategoryComponent } from './edit-admin-product-category/edit-admin-product-category.component';

@Component({
  selector: 'app-admin-product-category',
  templateUrl: './admin-product-category.component.html',
  styleUrls: ['./admin-product-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminProductCategoryComponent extends TableComponentBase<ProductCategoryOutputDto> {

  constructor(
    protected injector: Injector,
    public productCategoryService: ProductCategoryService,
    private sidePanelService: NgxSidePanelsService
    ) {
    super(injector);
  }

  selectedRow!: ProductCategoryOutputDto;
  hasPaging = false;

  headers: TobiTableColumn[] = [
    {
      headerName: 'Name',
      field: 'name',
      width: 'auto'
    },
  ];

  protected list(finishedCallback: Function): void {
    this.productCategoryService.getProductCategories().subscribe(result => {
      finishedCallback(result);
    });
  }

  onAdd(): void {
    this.sidePanelService.openPanel(EditAdminProductCategoryComponent, {
      routePath: `administration/product/editProduct`,
      skipLocationChange: true
    });
  }

  onEdit(selectedProductCategory: any): void {
    this.sidePanelService.openPanel(EditAdminProductCategoryComponent, {
      data: {...selectedProductCategory},
      routePath: `administration/product/editProduct`,
      skipLocationChange: true
    });
  }

  onDelete(selectedProductCategory: any): void {
    this.SwalWithBootstrapButtons.fire({
      text: `Are you sure want to delete "${selectedProductCategory.name}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<span>Delete</span>',
      cancelButtonText: '<span>Cancel</span>',
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.productCategoryService.deleteProductCategory(selectedProductCategory.id).subscribe(() => {
          this.refresh();
          this.Toast.fire(
            'Confirmed',
            'Successfully Deleted!',
            'success'
          );
        });
      }
    },
    () => {
      this.Toast.fire(
        'Confirmed',
        'Failed To Delete',
        'error'
      );
    });
  }
}
