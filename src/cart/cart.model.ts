import { IsString, IsNumber } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CartProduct {
  @IsString()
  id: string;
  @IsNumber()
  quantity: number;
}

export class CreateCartDto {
  readonly products?: {
    [key: string]: CartProduct
  }
}

export class Cart {
  owner: string;
  products: {
    [key: string]: CartProduct
  }

  @Exclude()
  productsIndexes: string[];

  constructor(partial: Partial<Cart>) {
    return Object.assign(this, partial);
  }
}
