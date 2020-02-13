import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Request,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, User } from '@user/user.model';
import { ApiTags, ApiBody, ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiForbiddenResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  @HttpCode(201)
  @ApiCreatedResponse({ type: User, description: 'User created' })
  @ApiForbiddenResponse({ description: 'User already exsists' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async register(@Body() user: CreateUserDto): Promise<User> {
    return this.authService.createUser(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      }
    }
  })
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        password: {
          type: 'string'
        }
      }
    }
  })
  @ApiOkResponse({ description: 'Password changed' })
  @ApiUnauthorizedResponse({ description: 'User unauthorized' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async changePassword(@Body('password') password: string, @Request() req) {
    return this.authService.changePassword(password, req.user.userId);
  }
}
