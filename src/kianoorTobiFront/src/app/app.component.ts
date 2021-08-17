import { Component } from '@angular/core';
import { NgxLoadingService } from './shared/services/ngx-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private loadingService: NgxLoadingService) {
    this.loadingService.loadingObservable.subscribe(loading => this.loading = loading);
  }

  loading = false;
  title = 'kianoorTobiFront';
}
