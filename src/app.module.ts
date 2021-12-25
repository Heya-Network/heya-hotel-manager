import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HotelsModule } from './hotels/hotels.module';
import { UsersModule } from './users/users.module';
import { RootModule } from './root/root.module';
import { BalancesModule } from './balances/balances.module';
import { AuthModule } from './auth/auth.module';
import { JWTModule } from 'JWT.module';
import { GraphQLModule } from '@nestjs/graphql';
import { RoomTypeModule } from 'room-type/room-type.module';
import { RoomModule } from 'room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MikroOrmModule.forRoot(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: "postgraphile/schema.gql",

    }),
    HotelsModule,
    UsersModule,
    RootModule,
    BalancesModule,
    AuthModule,
    JWTModule,
    RoomTypeModule,
    RoomModule,
  ],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
    // },
  ],
})
export class AppModule {}
