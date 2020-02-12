import { Injectable } from '@nestjs/common';
import { DbService } from '@db/db.service';
import { CollectionWrapper } from '@db/collection.wrapper';
import { ProductService } from '@product/product.service';
import { Cart, CreateCartDto, CartProduct } from './cart.model';

@Injectable()
export class CartService {
  private cartCollection: CollectionWrapper<any, any>;

  constructor(
    private readonly database: DbService,
    private readonly productService: ProductService,
  ) {
    this.cartCollection = this.database.getCartCollection();
  }

  async addToCart(cartId: string, cartProducts: CartProduct[]) {
    const cart = await this.findOne(cartId);
    cart.products = cart.products || {};
    this.handleAddingProducts(cart, cartProducts);

    await this.update(cartId, cart);
    return cart;
  }

  async findAll() {
    return this.cartCollection.findAll();
  }

  async findOne(cartId: string): Promise<Cart> {
    return this.cartCollection.findOne(cartId);
  }

  async create(cart: Partial<Cart>): Promise<Cart> {
    if (cart.products) {
      const keys = Object.keys(cart.products);
      cart.productsIndexes = [...keys];
    }
    return this.cartCollection.create(cart);
  }

  async update(cartId: string, cart: Cart | CreateCartDto): Promise<Cart> {
    return this.cartCollection.update(cartId, cart);
  }

  async delete(cartId: string): Promise<boolean> {
    return this.cartCollection.delete(cartId);
  }

  private handleAddingProducts(cart, cartProducts) {
    for (const product of cartProducts) {
      const index = this.productInCart(cart, product);
      if (index === -1) {
        cart.products[product.id] = product;
      } else {
        cart.products[product.id].quantity += product.quantity;
      }
    }
  }

  private productInCart(cart, product) {
    return cart.productsIndexes.indexOf(product.id);
  }
}
