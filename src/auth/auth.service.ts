import { UpdateAuthDto } from './dto/update-auth.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { Users } from 'users/entities/user.entity';
import { EntityManager } from '@mikro-orm/core';
import { Bcrypt } from 'utils/bcrypt.utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly em: EntityManager,
    private readonly bcrypt: Bcrypt,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pwd: string) {
    const user = await this.usersService.findEmail(email);
    if (user) {
      if (await this.bcrypt.compare(pwd, user.password)) {
        delete user.password;
        return this.createJwt(user);
      }
    }
    return null;
  }

  createJwt(user: Users) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async create(createUserDto: CreateUserDto) {
    const user = new Users(createUserDto);
    user.password = await this.bcrypt.hashPassword(createUserDto.password);
    await this.em.persistAndFlush([user]);
    delete user.password;
    return {... user, ...this.createJwt(user)};
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return this.em.findOneOrFail(Users, id);
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
