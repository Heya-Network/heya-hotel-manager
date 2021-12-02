import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RootController, HotelsController, BalancesController } from 'controllers';
import { HotelsService, SubstrateService } from 'services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MikroOrmModule.forRoot(),
  ],
  
  controllers: [RootController, BalancesController, HotelsController],
  providers: [SubstrateService, HotelsService],
})
export class AppModule {}
