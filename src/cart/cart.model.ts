import { IsString, IsNumber } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, getSchemaPath } from '@nestjs/swagger';

export class CartProduct {
  @IsString()
  id: string;
  @IsNumber()
  quantity: number;
}

export class CreateCartDto {
  @ApiPropertyOptional({
    type: 'object',
    properties: {
      productID: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          quantity: {
            type: 'number'
          }
        }
      }
    }
  })
  readonly products?: {
    [key: string]: CartProduct;
  };
}

export class Cart {
  @ApiProperty()
  owner: string;
  @ApiPropertyOptional({
    type: 'object',
    properties: {
      productID: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          quantity: {
            type: 'number'
          }
        }
      }
    }
  })
  products: {
    [key: string]: CartProduct;
  };

  @Exclude()
  productsIndexes: string[];

  constructor(partial: Partial<Cart>) {
    return Object.assign(this, partial);
  }
}
