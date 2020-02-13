import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsNumber()
  readonly price: number;
}

export class Product {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
}
