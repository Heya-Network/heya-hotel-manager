import { Injectable, Options } from '@nestjs/common';
import { EntityManager, FilterQuery, MikroORM, Property } from '@mikro-orm/core';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { Users } from 'users/entities/user.entity';
import { UserProperty } from 'users/entities/user-property.entity';

@Injectable()
export class HotelsService {
  constructor(
    private readonly em: EntityManager
  ) { }

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const hotel = new Hotel(createHotelDto);
    const user = await this.em.findOneOrFail(Users, createHotelDto.userId);
    if (Array.isArray(user?.properties) && user.properties.length === 1) {
      // if (user.properties.length === 1) {
      return; //only 1 hotel per user allowed
    }
    user.properties.add(new UserProperty(user, hotel));
    await this.em.persistAndFlush([hotel, user]);
    return hotel;
  }

  // async findAll(where: { User?: number }) {
  //   return await this.em.getRepository(Hotel).findAndCount({});
  // }

  async findAll(where: { User?: number }) {
    const [userProperty, total] = await this.em
      .getRepository(UserProperty)
      .findAndCount(where, { populate: ['Hotel'] });
    const hotels = [];

    userProperty.forEach((prop) => hotels.push(prop.Hotel));
    return [hotels, total];
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
