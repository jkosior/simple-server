import { DbModule } from '@db/db.module';
import { Module } from '@nestjs/common';
import { ProductModule } from '@product/product.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';


@Module({
  imports: [
    DbModule,
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule { }
