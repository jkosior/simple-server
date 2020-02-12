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
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart, CreateCartDto, CartProduct } from './cart.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get()
  async getAll() {
    return this.cartService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() cartToCreate: CreateCartDto, @Request() req): Promise<Cart> {
    const cart: Partial<Cart> = {
      ...cartToCreate,
      owner: req.user.userId,
    }
    return this.cartService.create(cart);
  }

  @Get(':id')
  async getCart(@Param('id') id: string): Promise<Cart> {
    const product = await this.cartService.findOne(id);
    return product
  }

  @Put(':id')
  async updateCart(
    @Param('id') id: string,
    @Body('user') newCartData: CreateCartDto,
  ): Promise<Cart> {
    const updatedCart = await this.cartService.update(id, newCartData);
    return updatedCart;
  }

  @Put(':id/products')
  async addProductToCart(
    @Param('id') id: string,
    @Body() cartProducts: CartProduct[],
  ) {
    const updatedCart = await this.cartService.addToCart(id, cartProducts);
    return updatedCart;
  }

  @Delete(':id')
  async deleteCart(@Param('id') id: string): Promise<boolean> {
    return this.cartService.delete(id);
  }
}
