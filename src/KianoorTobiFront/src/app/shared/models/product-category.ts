export class ProductCategory {
  name!: string;
}

export class ProductCategoryAddDto extends ProductCategory {
}

export class ProductCategoryEditDto extends ProductCategory {
  id! :number;
}

export class ProductCategoryOutputDto extends ProductCategory {
  id! :number;
}
