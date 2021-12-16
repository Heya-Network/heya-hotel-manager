import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { Bcrypt } from 'utils/bcrypt.utils';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, Bcrypt],
  imports: [
    UsersModule, 
    PassportModule,
    ConfigModule,
  ],
})
export class AuthModule {}
