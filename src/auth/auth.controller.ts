import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, User } from '@user/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<User> {
    return this.authService.createUser(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }
}
