import { Controller, Get, Param } from '@nestjs/common';
import { Substrate } from 'utils/substrate.utils';

@Controller('balances')
export class BalancesController {
    constructor(private readonly substrate: Substrate) {}

    @Get(":ss58")
    getBalanceRoute(@Param("ss58") ss58: string): Promise<Object> {
        return this.substrate.getBalance(ss58);
    }   
}
