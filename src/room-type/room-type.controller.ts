import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'auth/permissions/role.decorator';
import { Role } from 'auth/permissions/role.enum';
import { JwtAuthGuard, RolesGuard } from 'auth/guards';
import { JwtRequestDto } from 'auth/dto/jwt-request.dto';
import { RoomTypeService } from './room-type.service';
import { CreateRoomTypeInput } from './dto/create-room-type.input';

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
    if (!req.user.roles.includes(Role.Admin)) {
      createRoomTypeInput.propertyId = req.user.sub;
    }
    return this.roomTypeService.create(createRoomTypeInput);
  }
}
