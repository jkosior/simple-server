import { Injectable } from '@nestjs/common';
import { CollectionWrapper } from './collection.wrapper';
import { User, CreateUserDto } from '@user/user.model';
import { Product, CreateProductDto } from '@product/product.model';
import { Cart, CreateCartDto } from '@cart/cart.model';

interface Database {
  users: {
    [key: string]: User;
  };
  userIndexes: string[];
  products: {
    [key: string]: Product;
  };
  productIndexes: string[];
  carts: {
    [key: string]: Cart;
  };
  cartIndexes: string[];
}

@Injectable()
export class DbService {
  private database: Database = {
    users: {},
    userIndexes: [],
    products: {},
    productIndexes: [],
    carts: {},
    cartIndexes: [],
  };

  public getUserCollection() {
    const { users, userIndexes } = this.database;
    return new CollectionWrapper<User, CreateUserDto>(users, userIndexes);
  }

  public getCartCollection() {
    const { carts, cartIndexes } = this.database;
    return new CollectionWrapper<Cart, CreateCartDto>(carts, cartIndexes);
  }

  public getProductCollection() {
    const { products, productIndexes } = this.database;
    return new CollectionWrapper<Product, CreateProductDto>(products, productIndexes);
  }
}
