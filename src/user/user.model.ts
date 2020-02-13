import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Cart } from '@cart/cart.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly username: string;
  @ApiProperty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsString()
  readonly surname: string;
  @ApiProperty()
  @IsString()
  readonly password?: string;
}

export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiPropertyOptional()
  avatar?: string;
  @ApiPropertyOptional()
  files?: string[];
  @ApiPropertyOptional()
  carts?: Cart[];

  @Exclude()
  password?: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export class AvatarUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  avatar: any;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
