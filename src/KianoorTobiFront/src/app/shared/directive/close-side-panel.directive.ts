import { Directive, HostListener, Injector } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgxSidePanelsService } from 'ngx-side-panels';

@Directive({
  selector: '[appCloseSidePanel]'
})
export class CloseSidePanelDirective {

  sidePanelService!: NgxSidePanelsService;

  constructor(private injector: Injector) {
    this.sidePanelService = injector.get(NgxSidePanelsService);
  }

  @HostListener('click', ['$event'])
  onClick(control: AbstractControl): void {
    this.sidePanelService.closeLastPanel();
  }
}
