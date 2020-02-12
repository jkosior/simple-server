import { Injectable, NotFoundException } from '@nestjs/common';
import { CollectionWrapper } from '@db/collection.wrapper';
import { DbService } from '@db/db.service';
import { CreateUserDto, User } from './user.model';

@Injectable()
export class UserService {
  private userCollection: CollectionWrapper<User, CreateUserDto>;

  constructor(private readonly database: DbService) {
    this.userCollection = this.database.getUserCollection();
  }

  async findAll() {
    return this.userCollection.findAll();
  }

  async findOne(userId: string): Promise<User> {
    return this.userCollection.findOne(userId);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userCollection.findOneByParam('username', username) as User;
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.userCollection.create(user);
  }

  async update(userId: string, user: CreateUserDto): Promise<User> {
    const updatedUser = this.userCollection.update(userId, user);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async delete(userId: string): Promise<any> {
    const deletedUser = this.userCollection.delete(userId);
    if (!deletedUser) {
      throw new NotFoundException('User does not exist or was already deleted');
    }
    return this.userCollection.delete(userId);
  }

  async linkFile(userId: string, filePath: string, fileField: string = '') {
    const user = await this.findOne(userId);
    if (fileField === 'avatar') {
      user.avatar = filePath;
    } else {
      user.files = user.files || [];
      user.files.push(filePath);
    }

    return user;
  }
}
