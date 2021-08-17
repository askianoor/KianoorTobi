import { Component, Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tobi-table',
  templateUrl: './tobi-table.component.html',
  styleUrls: ['./tobi-table.component.scss']
})
export class TobiTableComponent {

  @Input() headers: any = [];
  @Input() source: any = [];
  @Input() selectedRow: any = {};

  @Input() viewOnly = false;
  @Input() hasPaging = true;
  @Input() pageNumber = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 20];

  @Input() hasAddButton = true;
  @Input() hasEditButton = true;
  @Input() hasDeleteButton = true;

  @Output() onAdd = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();
  @Output() selectedRowChange = new EventEmitter<any>();

  @Output() onPageChange = new EventEmitter<any>();
  @Output() pageNumberChange = new EventEmitter<number>();
  @Output() totalItemsChange = new EventEmitter<number>();
}

export class TobiTableColumn {
  headerName!: string;
  field!: string;
  width!: string | number;
  sticky?: boolean = false;
  rowspan?: number = 1;
  cellRenderer?: (rowData: any, cell: any) => {};
}


@Directive({
  selector: '[TobiTableCellRenderer]'
})
export class TobiTableCellRenderer {
  constructor(private el: ElementRef<HTMLElement>) {
  }

  @Input() rowData: any;

  @Input() set colData(col: TobiTableColumn) {

    if (col.cellRenderer && typeof (col.cellRenderer) === 'function') {

      let resultOfCellRenderer = col.cellRenderer(this.rowData, col.field);

      if (typeof (resultOfCellRenderer) === 'string') {
        this.el.nativeElement.innerHTML = resultOfCellRenderer;
      } else {
        this.el.nativeElement.appendChild(resultOfCellRenderer as HTMLElement);
      }
    } else {
      this.el.nativeElement.innerHTML = this.rowData[col.field];
    }
  }

}
