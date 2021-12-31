import { Controller, Get, Param, Patch, Delete, UseGuards, Post, UseInterceptors, Request, Body } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'auth/permissions/role.decorator';
import { Role } from 'auth/permissions/role.enum';
import { JwtAuthGuard, RolesGuard } from 'auth/guards';
import { JwtRequestDto } from 'auth/dto/jwt-request.dto';
import { RoomTypeService } from './room-type.service';
import { CreateRoomTypeInput } from './dto/create-room-type.input';
import { UpdateRoomTypeInput } from './dto/update-room-type.input';
import { ListResponseInterceptor } from 'interceptors/listReponse.interceptor';

@Controller('room-type')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(
    @Request() req: JwtRequestDto,
    @Body() createRoomTypeInput: CreateRoomTypeInput,
  ) {
    return this.roomTypeService.create(createRoomTypeInput);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(new ListResponseInterceptor())
  @Get()
  findAll() {
    return this.roomTypeService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admins/:id')
  findOne(@Param('id') id: number) {
    return this.roomTypeService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('admins/:id')
  update(@Param('id') id: number, @Body() updateHotelDto: UpdateRoomTypeInput) {
    return this.roomTypeService.update(id, updateHotelDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roomTypeService.remove(+id);
  }
}
