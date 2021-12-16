import { Injectable } from '@nestjs/common';
import { EntityManager, FilterQuery, MikroORM } from '@mikro-orm/core';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { Users } from 'users/entities/user.entity';
import { UserProperty } from 'users/entities/user-property.entity';

@Injectable()
export class HotelsService {
  constructor(
    // private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const hotel = new Hotel(createHotelDto);
    const user = await this.em.findOneOrFail(Users, createHotelDto.userId);
    if (user.properties.length === 1) {
      return; //only 1 hotel per user allowed
    }
    user.properties.add(new UserProperty(user, hotel));
    await this.em.persistAndFlush([hotel, user]);
    return hotel;
  }

  findAll() {
    return this.em.getRepository(Hotel).findAndCount({});
  }

  findOne(id: number) {
    return this.em.findOne(Hotel, id);
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    const hotel = await this.em.findOne(Hotel, id);
    hotel.status = updateHotelDto.status;
    await this.em.flush();
    return hotel;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
