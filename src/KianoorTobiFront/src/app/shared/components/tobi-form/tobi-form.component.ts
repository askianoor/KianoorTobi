import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormArray, NgForm, NgModel} from '@angular/forms';
@Component({
  selector: 'tobi-form',
  templateUrl: './tobi-form.component.html',
  styleUrls: ['./tobi-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tobiForm'
})
export class TobiFormComponent implements AfterViewInit {
  @ContentChildren(NgModel, {descendants: true})
  public models!: QueryList<NgModel>;

  @ViewChild('myForm')
  public form!: NgForm;

  @Input() hasSaveBtn = true;
  @Input() hasCancelBtn = true;
  @Input() saveBtnTxt = 'Save';
  @Input() cancelBtnText = 'Cancel';
  @Input() disabled = false;
  @Input() isNew = true;
  @Input() loading = true;
  @Input() saving: boolean | null = false;
  @Input() newText = '';
  @Input() editText = '';
  @Output() onSave = new EventEmitter<boolean>();

  constructor() { }

  ngAfterViewInit(): void {
    // This is needed because when <input>s get transcluded into the form via ng-content,
    // the form will not pick them up as children
    this.models.forEach((model) => {
      this.form.addControl(model);
    });
  }


  resetForm() {
    this.loading = true;
    this.form.resetForm();
    setTimeout(() => {
      this.loading = false;
    }, 10);
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  inputChangeStatus(ngform: NgForm, checkControlName: any): any {
    ngform.form?.controls[checkControlName]?.markAsTouched();
    ngform.form?.controls[checkControlName]?.updateValueAndValidity()
  }
}

@Directive({
  selector: 'tobi-form-footer',
})
export class TobiFormFooterDirective {

}
