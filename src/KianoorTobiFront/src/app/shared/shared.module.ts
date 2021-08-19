import {NgModule, ModuleWithProviders} from '@angular/core';
import { CloseSidePanelDirective } from './directive/close-side-panel.directive';
import { EnumToArrayPipe } from './pipes/enumToArray.pipe';
import {MoneyPipe} from './pipes/money.pipe';


@NgModule({
  imports: [],
  declarations: [
    MoneyPipe,
    CloseSidePanelDirective,
    EnumToArrayPipe,
  ],
  exports: [
    MoneyPipe,
    CloseSidePanelDirective,
    EnumToArrayPipe,
  ],
  providers: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        MoneyPipe,
      ]
    };
  }
}
