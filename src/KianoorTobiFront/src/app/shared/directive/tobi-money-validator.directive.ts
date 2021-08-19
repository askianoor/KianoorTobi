import { Directive, Input, forwardRef } from '@angular/core'
import { NG_VALIDATORS, Validator, AbstractControl, Validators } from '@angular/forms'
@Directive({
  selector: '[tobiMoneyValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TobiMoneyValidatorDirective, multi: true }]
})

export class TobiMoneyValidatorDirective {
  @Input() min!: number;
  @Input() max!: number;

  validate(control: AbstractControl): any {
    if (this.min !== undefined && this.min !== null && control.value < this.min) {
      return Validators.min(this.min)(control)
    } else if (this.max !== undefined && this.max !== null && control.value > this.max) {
      return Validators.max(this.max)(control)
    }
    return null;
  }

}
