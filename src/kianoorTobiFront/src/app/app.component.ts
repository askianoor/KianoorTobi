import { Component } from '@angular/core';
import Swal from 'sweetalert2';
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

  public Toast = Swal.mixin({
    toast: true,
    // position: 'bottom-end',
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    // width: '220px',
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  loading = false;
  title = 'kianoorTobiFront';
}
