import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TobiFormComponent, TobiFormFooterDirective } from './tobi-form.component';
import { SharedModule } from '../../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  declarations: [
    TobiFormComponent,
    TobiFormFooterDirective
  ],
  exports: [
    TobiFormComponent,
    TobiFormFooterDirective
  ]
})
export class TobiFormModule { }
