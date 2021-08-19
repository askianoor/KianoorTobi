import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxSidePanelsService } from 'ngx-side-panels';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { SaveProductSuccess, SaveNewProduct, SaveProductError, LoadProducts, LoadProductsSuccess } from '../actions/product.action';

@Injectable()
export class ProductEffects {
  public readonly loadProducts$ = createEffect(() => this.actions$
  .pipe(ofType(LoadProducts),
  mergeMap((res) => this.productService.getProducts()),
  map(res => LoadProductsSuccess({payload: res}))
  ));

  public readonly saveProduct$ = createEffect(() => {
    return this.actions$.pipe(ofType(SaveNewProduct),
      mergeMap(p => this.productService.addProduct(p.payload)),
      tap(() => this.panelService.closeLastPanel()),
      map(p => SaveProductSuccess({ payload: p }),
      catchError(err => of(SaveProductError))
      ));
  });

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private panelService: NgxSidePanelsService
  ) {}
}
