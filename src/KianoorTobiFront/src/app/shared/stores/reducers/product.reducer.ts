import {createReducer, on} from '@ngrx/store';
import { ProductOutputDto } from '../../models/product';
import { SaveProductSuccess, DeleteProduct, LoadProducts, UpdateProduct, SaveProductError, SaveNewProduct, LoadProductsSuccess } from '../actions/product.action';

export const initialState: IProductInitiali = {saving: false,products: []};

export interface IProductInitiali {
  saving?: boolean,
  loading?: boolean,
  products: ProductOutputDto[]
};

const _productReducer = createReducer(
  initialState,
  on(LoadProducts, (state) =>
  {
    return {loading: true, products: state.products}
  }),
  on(LoadProductsSuccess, (state, {payload})=> {
    return {products: payload, loading: false};
  }),
  on(SaveNewProduct, (state, {payload}) => {
    return {saving: true, products: state.products};
  }),
  on(SaveProductSuccess, (state, {payload}) => {
    const products = [...state.products];
    const index = products.findIndex(r => r.id == payload.id);
    if(index == -1)
    {
      products.push(payload);
    }
    return {saving:false, products};
  }),
  on(SaveProductError, (state,) => state),
  on(UpdateProduct, (state) => state),
  on(DeleteProduct, (state) => state)
);

export function productReducer(state: any, action: any) {
  return _productReducer(state, action);
}
