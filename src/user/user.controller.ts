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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto, User } from './user.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '@server/imageFileFilter';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/profile')
  async getUserInfo(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    return new User(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body('user') newUserData: CreateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, newUserData);
    return new User(updatedUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('avatar', {
    fileFilter: imageFileFilter,
  }))
  async uploadAvatar(@Param('id') id: string, @UploadedFile() avatar) {
    const user = await this.userService.linkFile(id, avatar.path, 'avatar');
    return new User(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('id') id: string, @Param() @UploadedFile() file) {
    const user = await this.userService.linkFile(id, file.path);
    return new User(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
