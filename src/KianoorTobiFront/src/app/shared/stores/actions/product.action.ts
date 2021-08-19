
import {createAction, props} from "@ngrx/store";
import { ProductAddDto, ProductEditDto, ProductOutputDto } from "../../models/product";

export class ProductModel extends ProductOutputDto {
  constructor() {
    super();
  }
}

export const LoadProducts = createAction('[Product Component] Load Products');
export const LoadProductsSuccess = createAction('[Product Component] Load Products Success', props<{payload: ProductOutputDto[]}>());
export const UpdateProduct = createAction('[Product Component] Update A Product', props<{ payload: ProductOutputDto }>());
export const DeleteProduct = createAction('[Product Component] Delete A Product');
export const SaveNewProduct = createAction('[Product Component] Save A Product', props<{ payload: ProductAddDto }>());
export const SaveProductSuccess = createAction('[Product Component] Save Product Success]', props<{ payload: ProductOutputDto }>());
export const SaveProductError = createAction('[Product Component] Save Product Error');
