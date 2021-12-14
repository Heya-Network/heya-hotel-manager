import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HotelsModule } from './hotels/hotels.module';
import { UsersModule } from './users/users.module';
import { RootModule } from './root/root.module';
import { BalancesModule } from './balances/balances.module';
import { Substrate } from 'utils/substrate.utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MikroOrmModule.forRoot(),
    HotelsModule,
    UsersModule,
    RootModule,
    BalancesModule,
  ],
  providers: [
    Substrate,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
    // },
  ],
})
export class AppModule {}
