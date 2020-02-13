import { DbModule } from '@db/db.module';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { multerDestinationHandler } from '@server/multerDestinationHandler';
import { multerFilenameHandler } from '@server/multerFileNameHandler';
import { jwtConstants } from '@auth/auth.constants';
import { JwtModule } from '@nestjs/jwt';
import { CartModule } from '@cart/cart.module';

@Module({
  imports: [
    DbModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: multerDestinationHandler,
          filename: multerFilenameHandler,
        }),
      }),
    }),
    CartModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
