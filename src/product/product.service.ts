import { Injectable } from '@nestjs/common';
import { DbService } from '@db/db.service';
import { CollectionWrapper } from '@db/collection.wrapper';
import { Product, CreateProductDto } from './product.model';

@Injectable()
export class ProductService {
  private productCollection: CollectionWrapper<Product, CreateProductDto>;

  constructor(private readonly database: DbService) {
    this.productCollection = this.database.getProductCollection();
  }

  async findAll() {
    return this.productCollection.findAll();
  }

  async findOne(productId: string): Promise<any> {
    return this.productCollection.findOne(productId);
  }

  async findOneByName(productName: string): Promise<Product> {
    return this.productCollection.findOneByParam('name', productName);
  }

  async create(product: CreateProductDto): Promise<any> {
    return this.productCollection.create(product);
  }

  async update(productId: string, product: CreateProductDto): Promise<Product> {
    return this.productCollection.update(productId, product);
  }

  async delete(productId: string): Promise<boolean> {
    return this.productCollection.delete(productId);
  }
}
