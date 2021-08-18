import {NgModule, ModuleWithProviders} from '@angular/core';
import {MoneyPipe} from './pipes/money.pipe';


@NgModule({
  imports: [],
  declarations: [
    MoneyPipe,
  ],
  exports: [
    MoneyPipe,
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
