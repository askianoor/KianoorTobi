import { Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-administration',
  template: `<router-outlet></router-outlet>`,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {
  constructor() {}
}
