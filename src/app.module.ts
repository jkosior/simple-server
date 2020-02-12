import { DbModule } from '@db/db.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { CartModule } from '@cart/cart.module';
import { ProductModule } from '@product/product.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@auth/auth.constants';

@Module({
  imports: [
    ConfigModule.resolveRootPath(__dirname).load(
      'config/**/!(*.d).config.{ts,js}',
      {
        modifyConfigName: name => name.replace('.config', ''),
      },
    ),
    DbModule,
    AuthModule,
    CartModule,
    ProductModule,
    UserModule,
  ],
})
export class AppModule {}
