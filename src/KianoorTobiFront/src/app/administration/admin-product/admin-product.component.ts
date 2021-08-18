import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { TobiTableColumn } from 'src/app/shared/components/tobi-table/tobi-table.component';
import { ProductType } from 'src/app/shared/enums/product-type.enum';
import { ProductOutputDto } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { PagedResultDto, TableComponentBase } from 'src/app/shared/table-component-base';
import { MoneyPipe } from 'src/app/shared/pipes/money.pipe';
import { NgxSidePanelsService } from 'ngx-side-panels';
import { AdminProductCategoryComponent } from '../admin-product-category/admin-product-category.component';
import { EditAdminProductComponent } from './edit-admin-product/edit-admin-product.component';
import { SweetAlertResult } from 'sweetalert2';
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminProductComponent extends TableComponentBase<ProductOutputDto> {

  constructor(
    protected injector: Injector,
    public productService: ProductService,
    private moneyPipe :MoneyPipe,
    private sidePanelService: NgxSidePanelsService
    ) {
    super(injector);
  }

  selectedRow!: ProductOutputDto;
  hasPaging = false;

  headers: TobiTableColumn[] = [
    {
      headerName: 'Name',
      field: 'name',
      width: 'auto'
    },
    {
      headerName: 'Type',
      field: 'type',
      width:'auto',
      cellRenderer: (row: any) => {
        const productTypeString = ProductType.toString(row.type);
        if (productTypeString) {
          return productTypeString;
        } else {
          return `Not Valid!`;
        }
      }
    },
    {
      headerName: 'Price',
      field: 'price',
      width:'auto',
      cellRenderer: (row: any) => {
        return this.moneyPipe.transform(row.price)?? row.price;
      }
    },
  ];

  protected list(finishedCallback: Function): void {
    this.productService.getProducts().subscribe(result => {
      finishedCallback(result);
    });
  }

  onAdd(): void {
    this.sidePanelService.openPanel(EditAdminProductComponent, {
      routePath: `administration/product/editProduct`,
      skipLocationChange: true
    });
  }

  onEdit(selectedProduct: any): void {
    debugger
    this.sidePanelService.openPanel(EditAdminProductComponent, {
      data: {selectedProduct},
      routePath: `administration/product/editProduct`,
      skipLocationChange: true
    });
  }

  onDelete(selectedProduct: any): void {
    this.SwalWithBootstrapButtons.fire({
      title: `Are you sure want to delete "${selectedProduct.name}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(selectedProduct.id).subscribe(() => {
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
