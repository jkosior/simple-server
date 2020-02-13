import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AvatarUploadDto, CreateUserDto, FileUploadDto ,User } from './user.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '@server/imageFileFilter';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/profile')
  @ApiOkResponse({ type: User, description: 'Get user profile' })
  @ApiNotFoundResponse({ description: 'User not found in database' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getUserInfo(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getUserProfile(id);
    return new User(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: CreateUserDto, description: 'Update user' })
  @ApiNotFoundResponse({ description: 'User not found in database' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async updateUser(
    @Param('id') id: string,
    @Body('user') newUserData: CreateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, newUserData);
    return new User(updatedUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Avatar image',
    type: AvatarUploadDto
  })
  async uploadAvatar(@Param('id') id: string, @UploadedFile() avatar) {
    const user = await this.userService.linkFile(id, avatar.path, 'avatar');
    return new User(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'any file',
    type: FileUploadDto
  })
  async uploadFile(@Param('id') id: string, @UploadedFile() file) {
    const user = await this.userService.linkFile(id, file.path);
    return new User(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(202)
  @ApiResponse({ status: 202, description: 'Delete user', type: '' })
  @ApiNotFoundResponse({ description: 'User not found in database' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async deleteUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
