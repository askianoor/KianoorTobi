import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxLoadingService {

  private loadingSub = new BehaviorSubject<boolean>(false);
  public loadingObservable = this.loadingSub.asObservable();

  setLoading(loading: boolean): void {
    this.loadingSub.next(loading);
  }

  constructor() { }
}
