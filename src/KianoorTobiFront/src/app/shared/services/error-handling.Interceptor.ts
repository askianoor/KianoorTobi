import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorHandling implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any) => {
        if(typeof(error.error)!= 'string')
        {
          var messages = '';
          for (const key of Object.keys(error.error)) {
            const temp = error.error[key];
            if(typeof(temp)== 'string') {
              messages += temp + "\n";
            } else {
                const tempArr = error.error[key];
                tempArr.forEach((errItem: any) => {
                messages += errItem + "\n";
              });
            }
          }
          Swal.fire('Error', messages, "error");
        } else {
          Swal.fire('Error', error.error, "error");
        }
        return throwError(error);
      }));
  }

}
