import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Bcrypt } from 'utils/bcrypt.utils';
import { JwtStrategy } from 'auth/jwt.strategy';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService, 
    Bcrypt,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    JwtStrategy
  ],
  exports: [UsersService],
})
export class UsersModule {}
