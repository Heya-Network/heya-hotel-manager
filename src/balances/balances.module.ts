import { Module } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { BalancesController } from './balances.controller';
import { Substrate } from 'utils/substrate.utils';

@Module({
  controllers: [BalancesController],
  providers: [BalancesService, Substrate]
})
export class BalancesModule {}
