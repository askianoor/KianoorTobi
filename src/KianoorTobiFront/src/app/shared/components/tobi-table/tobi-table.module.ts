import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TobiTableCellRenderer, TobiTableComponent } from './tobi-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  exports: [
    TobiTableComponent
  ],
  declarations: [
    TobiTableComponent,
    TobiTableCellRenderer
  ]
})
export class TobiTableModule { }
