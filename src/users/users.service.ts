import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Bcrypt } from 'utils/bcrypt.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
    private readonly bcrypt: Bcrypt
  ) {}

  //TODO: for admins
  async create(createUserDto: CreateUserDto) {
    const user = new Users(createUserDto);
    user.password = await this.bcrypt.hashPassword(createUserDto.password);
    await this.em.persistAndFlush([user]);
    return user;
  }

  findAll() {
    return this.em.getRepository(Users).findAndCount({});
  }

  findOne(id: number) {
    return this.em.findOne(Users, id);
  }

  findEmail(email: string) {
    return this.em.findOne(Users, {email});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.em.findOne(Users, id);
    user.polkadotSs58 = updateUserDto.polkadotSs58;
    await this.em.flush();
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
