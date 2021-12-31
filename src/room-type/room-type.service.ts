import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Hotel } from 'hotels/entities/hotel.entity';
import { CreateRoomTypeInput } from './dto/create-room-type.input';
import { UpdateRoomTypeInput } from './dto/update-room-type.input';
import { RoomType } from './entities/room-type.entity';

@Injectable()
export class RoomTypeService {
  constructor(private readonly em: EntityManager) {}

  async create(createRoomTypeInput: CreateRoomTypeInput) {
    const hotel = await this.em.findOneOrFail(Hotel, createRoomTypeInput.propertyId);
    const roomType = new RoomType();
    roomType.name = createRoomTypeInput.name;
    roomType.property = hotel;
    await this.em.persistAndFlush([roomType]);
    return roomType;
  }

  findAll() {
    return this.em.getRepository(RoomType).findAndCount({});
  }

  findOne(id: number) {
    return this.em.findOne(RoomType, id);
  }

  update(id: number, updateRoomTypeInput: UpdateRoomTypeInput) {
    return `This action updates a #${id} roomType`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomType`;
  }
}
