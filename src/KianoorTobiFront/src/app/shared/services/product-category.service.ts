import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ProductCategory } from '../models/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseProductCategoriesUrl: string = environment.baseUrl + 'api/ProductCategories/';

  constructor(private http: HttpClient) { }

  public addProductCategory(productcategory: ProductCategory) {
      return this.http.post(this.baseProductCategoriesUrl, productcategory);
  }

  public updateProductCategory(productcategory: ProductCategory) {
      return this.http.put(this.baseProductCategoriesUrl, productcategory);
  }

  public getProductCategories(): Observable<ProductCategory[]> {
      return this.http.get<ProductCategory[]>(this.baseProductCategoriesUrl);
  }

  public deleteProductCategory(id: number) {
      return this.http.delete(this.baseProductCategoriesUrl + id);
  }

  public getProductCategoryById(id: number): Observable<ProductCategory> {
      return this.http.get<ProductCategory>(this.baseProductCategoriesUrl + id);
  }

  public getProductCategoryBySearch(name: string): Observable<ProductCategory[]> {
      return this.http.get<ProductCategory[]>(`${this.baseProductCategoriesUrl}search/${name}`);
  }

}
