import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
  ) {}


  async create(createUserDto: CreateUserDto) {
    const user = new User();
    await this.em.persistAndFlush([user]);
    return user;
  }

  findAll() {
    return this.em.getRepository(User).findAndCount({});
  }

  findOne(id: number) {
    return this.em.findOne(User, id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.em.findOne(User, id);
    user.polkadotSs58 = updateUserDto.polkadotSs58;
    await this.em.flush();
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
