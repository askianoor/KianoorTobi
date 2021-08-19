import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Product, ProductAddDto, ProductEditDto, ProductOutputDto } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseProductsUrl: string = environment.baseUrl + 'api/Products/';

  constructor(private http: HttpClient) { }

  public addProduct(productDto: ProductAddDto): Observable<ProductOutputDto> {
      return this.http.post<ProductOutputDto>(this.baseProductsUrl, productDto);
  }

  public updateProduct(productDto: ProductEditDto): Observable<ProductOutputDto>  {
      return this.http.put<ProductOutputDto>(this.baseProductsUrl, productDto);
  }

  public deleteProduct(id: number) {
    return this.http.delete(this.baseProductsUrl + id);
  }

  public getProducts(): Observable<ProductOutputDto[]> {
      return this.http.get<ProductOutputDto[]>(this.baseProductsUrl);
  }

  public getProductById(id: number): Observable<ProductOutputDto> {
      return this.http.get<ProductOutputDto>(this.baseProductsUrl + id);
  }

  public searchProductsWithType(searchedValue: string): Observable<ProductOutputDto[]> {
      return this.http.get<ProductOutputDto[]>(`${this.baseProductsUrl}products/search-product-with-type/${searchedValue}`);
  }

}
