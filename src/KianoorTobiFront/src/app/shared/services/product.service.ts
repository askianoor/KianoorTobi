import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseProductsUrl: string = environment.baseUrl + 'api/Products/';

  constructor(private http: HttpClient) { }

  public addProduct(product: Product) {
      return this.http.post(this.baseProductsUrl, product);
  }

  public updateProduct(product: Product) {
      return this.http.put(this.baseProductsUrl, product);
  }

  public deleteProduct(id: number) {
    return this.http.delete(this.baseProductsUrl + id);
  }

  public getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.baseProductsUrl);
  }

  public getProductById(id: number): Observable<Product> {
      return this.http.get<Product>(this.baseProductsUrl + id);
  }

  public searchProductsWithType(searchedValue: string): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.baseProductsUrl}products/search-product-with-type/${searchedValue}`);
  }

}
