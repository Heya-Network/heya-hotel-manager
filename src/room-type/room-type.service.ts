import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Hotel } from 'hotels/entities/hotel.entity';
import { CreateRoomTypeInput } from './dto/create-room-type.input';
import { UpdateRoomTypeInput } from './dto/update-room-type.input';
import { RoomType } from './entities/room-type.entity';
import { Users } from 'users/entities/user.entity';
import { Roles } from 'auth/permissions/role.decorator';
import { Role } from 'auth/permissions/role.enum';
import { JwtRequestDto } from 'auth/dto/jwt-request.dto';

@Injectable()
export class RoomTypeService {
  constructor(private readonly em: EntityManager) { }

  async create(createRoomTypeInput: CreateRoomTypeInput) {
    const hotel = await this.em.findOneOrFail(Hotel, createRoomTypeInput.propertyId);
    const roomType = new RoomType(createRoomTypeInput);
    roomType.name = createRoomTypeInput.name;

    // @ts-ignore
    roomType.property = { ...hotel };
    await this.em.persistAndFlush([roomType]);
    return roomType;
  }

  findAll(id?: number) {
    return this.em.getRepository(RoomType).findAndCount({});
  }

  async findOne(id: number, user: any) {
    // if (!user.roles.includes(Role.Admin)) {
    //   const findUser = await this.em.find(Users, user.sub);
    //   console.log(findUser, 'FIND USER');
    // }
    return this.em.findOne(RoomType, id);
  }

  update(id: number, updateRoomTypeInput: UpdateRoomTypeInput) {
    return `This action updates a #${id} roomType`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomType`;
  }
}
