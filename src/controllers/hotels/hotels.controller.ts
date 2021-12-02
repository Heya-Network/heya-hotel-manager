import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateHotelDto } from 'DTOs/create-hotel.dto';
import { Hotel } from 'entities/hotel.entity';
import { HotelsService } from 'services';

@Controller('hotels')
export class HotelsController {
    constructor(private readonly hotelsService: HotelsService) {}

    @Post()
    async createHotelRoute(@Body() createHotelDto: CreateHotelDto): Promise<Hotel> {
        try {
            return await this.hotelsService.createHotel(createHotelDto.ss58);
        } catch (e) {
            console.log(e);
        }
    }

    @Get("/statuses/:ss58")
    async getStatusRoute(@Param("ss58") ss58: string): Promise<string> {
        return await this.hotelsService.getStatus(ss58);
    }
}
