import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BalancesController } from 'controllers/balances/balances.controller';
import { RootController } from 'controllers/root/root.controller';
import { SubstrateService } from 'services';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
  })],
  controllers: [RootController, BalancesController],
  providers: [SubstrateService],
})
export class AppModule {}
