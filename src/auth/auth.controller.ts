import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Bind, Request, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtRequestDto } from './dto/jwt-request.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard, JwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: JwtRequestDto, @Body() _: LoginAuthDto) {
    return req.user;
  }


  @Post("register")
  create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.polkadotSs58 && !createUserDto.metamaskHex) {
      throw new BadRequestException();
    }
    return this.authService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  findOne(@Request() req: JwtRequestDto) {
    return req.user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
