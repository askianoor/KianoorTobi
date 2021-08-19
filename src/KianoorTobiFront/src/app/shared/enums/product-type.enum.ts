export enum ProductType {
  Peripheral = 1,
  Integrated = 2
}
export namespace ProductType {
  export function toString(dir: ProductType): string {
      return ProductType[dir];
  }

  export function fromString(dir: string): ProductType {
      return (ProductType as any)[dir];
  }
}
