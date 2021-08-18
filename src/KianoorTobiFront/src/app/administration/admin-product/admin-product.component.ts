import { Component, Injector, OnInit } from '@angular/core';
import { TobiTableColumn } from 'src/app/shared/components/tobi-table/tobi-table.component';
import { ProductType } from 'src/app/shared/enums/product-type.enum';
import { ProductOutputDto } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { PagedResultDto, TableComponentBase } from 'src/app/shared/table-component-base';
import { CurrencyPipe } from '@angular/common';
import { MoneyPipe } from 'src/app/shared/pipes/money.pipe';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent extends TableComponentBase<ProductOutputDto> {

  constructor(protected injector: Injector, public productService: ProductService,private moneyPipe :MoneyPipe) {
    super();
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

  }

  onEdit(selectProduct: any): void {
    console.dir(selectProduct);
  }

  onDelete(selectProduct: any): void {
    console.dir(selectProduct);
  }
}
