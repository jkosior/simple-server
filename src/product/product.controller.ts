import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateProductDto, Product } from './product.model';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOkResponse({ description: 'Get products', type: [Product] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAll() {
    return this.productService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: CreateProductDto, description: 'Create product' })
  @ApiBadRequestResponse({ description: 'Product already exists in database' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.create(product);
  }

  @Get(':id')
  @ApiOkResponse({ type: Product, description: 'Get product' })
  @ApiNotFoundResponse({ description: 'Product not found in database' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getProduct(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.findOne(id);
    return product;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiBody({ type: CreateProductDto })
  @ApiOkResponse({ type: Product, description: 'Update product' })
  @ApiNotFoundResponse({ description: 'Product not found in database' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async updateProduct(
    @Param('id') id: string,
    @Body() newProductData: CreateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productService.update(id, newProductData);
    return updatedProduct;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(202)
  @ApiResponse({ status: 202, description: 'Delete product', type: '' })
  @ApiNotFoundResponse({ description: 'Product not found in database' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async deleteProduct(@Param('id') id: string): Promise<boolean> {
    return this.productService.delete(id);
  }
}
