import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto, Product } from './product.model';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Get()
  async getAll() {
    return this.productService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.create(product);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.findOne(id);
    return product
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() newProductData: CreateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productService.update(id, newProductData);
    return updatedProduct;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<boolean> {
    return this.productService.delete(id);
  }
}
