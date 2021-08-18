import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSidePanelsService } from 'ngx-side-panels';
import { TobiTableColumn } from 'src/app/shared/components/tobi-table/tobi-table.component';
import { ProductCategoryOutputDto } from 'src/app/shared/models/product-category';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';
import { TableComponentBase } from 'src/app/shared/table-component-base';
import { SweetAlertResult } from 'sweetalert2';

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

  }

  onEdit(selectedProductCategory: any): void {
    console.dir(selectedProductCategory);
  }

  onDelete(selectedProductCategory: any): void {
    console.dir(selectedProductCategory);
    this.SwalWithBootstrapButtons.fire({
      title: `Are you sure want to delete "${selectedProductCategory.name}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
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
