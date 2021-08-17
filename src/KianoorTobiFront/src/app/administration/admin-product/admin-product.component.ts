import { Component, Injector, OnInit } from '@angular/core';
import { ProductOutputDto } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { PagedResultDto, TableComponentBase } from 'src/app/shared/table-component-base';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent extends TableComponentBase<ProductOutputDto> {

  constructor(protected injector: Injector, public productService: ProductService) {
    super();
  }

  selectedRow!: ProductOutputDto;
  hasPaging = false;

  headers = [
    {
      headerName: 'Name',
      field: 'name',
    },
    {
      headerName: 'Type',
      field: 'type',
      cellRenderer: (row: any) => {
        if (row.value == 0) {
          return `Peripheral`; //ProductType.Peripheral;
        } else if (row.value == 1) {
          return `Integrated`; //ProductType.Integrated;
        } else {
          return `Not Valid!`;
        }
      }
    },
    {
      headerName: 'Price',
      field: 'price',
    },
  ];

  protected list(finishedCallback: Function): void {
    this.productService.getProducts().subscribe(result => {
      finishedCallback(result);
    });
  }

  onAdd(): void {

  }

  onEdit(selectProduct: any): void {
    console.dir(selectProduct);
  }

  onDelete(selectProduct: any): void {
    console.dir(selectProduct);
  }
}
