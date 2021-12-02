import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Hotel } from 'entities/hotel.entity';

@Injectable()
export class HotelsService {
  // static getBalance: any;
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  async createHotel(ss58: string): Promise<Hotel> {
    const hotel = new Hotel(ss58);
    await this.em.persistAndFlush([hotel]);
    return hotel;
  }

  async getStatus(ss58: string): Promise<string> {
    const hotel:Hotel = await this.orm.em.findOne(Hotel, ss58);
    return hotel.status;
  }
}
