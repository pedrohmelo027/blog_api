import { CreateUserDto } from './dtos/createUser.dto';
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interfaces';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUser: CreateUserDto): Promise<User> {

    const saltOrRounds = 10;
    const passwordHashed = await hash(createUser.password, saltOrRounds);

    const user: User = {
      ...createUser,
      id: this.users.length + 1,
      password: passwordHashed,
    };

    this.users.push(user);

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}