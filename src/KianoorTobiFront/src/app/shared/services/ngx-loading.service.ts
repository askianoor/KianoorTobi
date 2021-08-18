import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxLoadingService {

  private loadingSub = new BehaviorSubject<boolean>(false);
  public loadingObservable = this.loadingSub.asObservable();

  setLoading(loading: boolean): void {
    setTimeout(() => {
      this.loadingSub.next(loading);
    }, 500);
  }

  constructor() { }
}
