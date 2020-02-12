import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { User, CreateUserDto } from '@user/user.model';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly saltRounds: number = 10;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  generateHashPassword(pass: string) {
    return hash(pass, this.saltRounds);
  }

  async createUser(user: CreateUserDto) {
    const foundUser: User = await this.userService.findOne(user.username);
    if (foundUser) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User already exists',
        },
        403,
      );
    }

    const hashedPassword = await this.generateHashPassword(user.password);
    const userToSave = {
      ...user,
      password: hashedPassword,
    };

    const savedUser = await this.userService.create(userToSave);
    return new User(savedUser); // omits password
  }

  async validateUser(username: string, pass: string) {
    const user: User = await this.userService.findByUsername(username);
    if (!user) {
      return null;
    }

    const passwordMatches = await compare(pass, user.password);

    if (!passwordMatches) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  async login({ username, password }: User) {
    const payload = { username, sub: password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
