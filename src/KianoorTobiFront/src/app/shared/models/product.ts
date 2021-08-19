import { ProductType } from "../enums/product-type.enum";

export abstract class Product {
  name! :string
  price! :number;
  type! :ProductType;
  productCategoryId! :number;
  productCategoryName! :string;
}

export class ProductAddDto extends Product {
}

export class ProductEditDto extends Product {
  id! :number;
}

export class ProductOutputDto extends Product {
  id! :number;
}
