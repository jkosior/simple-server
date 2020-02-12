import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly surname: string;
  @IsString()
  readonly password: string;
}

export class User {
  id: string;
  username: string;
  name: string;
  surname: string;
  avatar?: string;
  files?: string[];

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
