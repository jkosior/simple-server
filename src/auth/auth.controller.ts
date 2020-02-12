import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Request,
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

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  async changePassword(@Body('password') password: string, @Request() req) {
    return this.authService.changePassword(password, req.user.userId);
  }

}