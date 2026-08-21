import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './schemas/create-user.schema';
import { UpdateUserInput } from './schemas/update-user.schema';

@Injectable()
export class UsersService {
  create(data: CreateUserInput) {
    return data;
  }

  update(id: number, data: UpdateUserInput) {
    return data;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
