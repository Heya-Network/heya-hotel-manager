import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ListResponseInterceptor } from 'interceptors/listReponse.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'auth/permissions/role.decorator';
import { Role } from 'auth/permissions/role.enum';
import { JwtAuthGuard, RolesGuard } from 'auth/guards';
import { JwtRequestDto } from 'auth/dto/jwt-request.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) { }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Request() req: JwtRequestDto, @Body() createHotelDto: CreateHotelDto) {
    if (!req.user.roles.includes(Role.Admin)) {
      createHotelDto.userId = req.user.sub;
    }
    return this.hotelsService.create(createHotelDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(new ListResponseInterceptor())
  @Get()
  findAll(@Request() req: JwtRequestDto) {
    const where: { User?: number } = {};

    if (!req.user.roles.includes(Role.Admin)) {
      where.User = Number(req.user.sub);
    }
    return this.hotelsService.findAll(where);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.hotelsService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('admins/:id')
  update(@Param('id') id: number, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(id, updateHotelDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.hotelsService.remove(+id);
  }
}
