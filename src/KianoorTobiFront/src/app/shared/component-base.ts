import {Injector} from '@angular/core';
import Swal from 'sweetalert2';

export abstract class ComponentBase {

  public SwalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'tobi-btn delete-btn mx-2',
      cancelButton: 'tobi-btn cancel-btn mx-2'
    },
    buttonsStyling: false,
  });

  public Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  private _injector: Injector;

  protected constructor(injector: Injector) {
    this._injector = injector;
  }

}
