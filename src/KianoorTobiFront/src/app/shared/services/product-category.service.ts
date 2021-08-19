import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ProductCategory, ProductCategoryAddDto, ProductCategoryEditDto, ProductCategoryOutputDto } from '../models/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseProductCategoriesUrl: string = environment.baseUrl + 'api/ProductCategories/';

  constructor(private http: HttpClient) { }

  public addProductCategory(productcategory: ProductCategoryAddDto) {
      return this.http.post(this.baseProductCategoriesUrl, productcategory);
  }

  public updateProductCategory(productcategory: ProductCategoryEditDto) {
      return this.http.put(this.baseProductCategoriesUrl, productcategory);
  }

  public getProductCategories(): Observable<ProductCategoryOutputDto[]> {
      return this.http.get<ProductCategoryOutputDto[]>(this.baseProductCategoriesUrl);
  }

  public deleteProductCategory(id: number) {
      return this.http.delete(this.baseProductCategoriesUrl + id);
  }

  public getProductCategoryById(id: number): Observable<ProductCategoryOutputDto> {
      return this.http.get<ProductCategoryOutputDto>(this.baseProductCategoriesUrl + id);
  }

  public getProductCategoryBySearch(name: string): Observable<ProductCategoryOutputDto[]> {
      return this.http.get<ProductCategoryOutputDto[]>(`${this.baseProductCategoriesUrl}search/${name}`);
  }

}
