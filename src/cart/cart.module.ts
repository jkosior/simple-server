import { DbModule } from '@db/db.module';
import { Module } from '@nestjs/common';
import { ProductModule } from '@product/product.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@auth/auth.constants';


@Module({
  imports: [
    DbModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule { }
