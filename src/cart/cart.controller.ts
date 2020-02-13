import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart, CreateCartDto, CartProduct } from './cart.model';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiCreatedResponse, ApiOkResponse, ApiBody, ApiTags, ApiBearerAuth, getSchemaPath } from '@nestjs/swagger';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getAll() {
    return this.cartService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: CreateCartDto, description: 'Create cart' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(
    @Body() cartToCreate: CreateCartDto,
    @Request() req,
  ): Promise<Cart> {
    const cart: Partial<Cart> = {
      ...cartToCreate,
      owner: req.user.userId,
    };
    return this.cartService.create(cart);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOkResponse({ type: Cart, description: 'Get cart' })
  @ApiNotFoundResponse({ description: 'Cart not found in database' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getCart(@Param('id') id: string): Promise<Cart> {
    const product = await this.cartService.findOne(id);
    return product;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiBody({ type: CreateCartDto })
  @ApiOkResponse({ type: Cart, description: 'Update cart' })
  @ApiNotFoundResponse({ description: 'Cart not found in database' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async updateCart(
    @Param('id') id: string,
    @Body('user') newCartData: CreateCartDto,
  ): Promise<Cart> {
    const updatedCart = await this.cartService.update(id, newCartData);
    return updatedCart;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/products')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        product: {
          type: 'array',
          items: {
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
      }
    }
  })
  @ApiOkResponse({ type: Cart, description: 'Add products to cart' })
  @ApiNotFoundResponse({ description: 'Cart not found in database' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async addProductToCart(
    @Param('id') id: string,
    @Body('products') cartProducts: CartProduct[],
  ) {
    const updatedCart = await this.cartService.addToCart(id, cartProducts);
    return updatedCart;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(202)
  @ApiResponse({ status: 202, description: 'Delete cart', type: '' })
  @ApiNotFoundResponse({ description: 'Cart not found in database' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async deleteCart(@Param('id') id: string): Promise<boolean> {
    return this.cartService.delete(id);
  }
}
