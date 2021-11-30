import { Controller, Get, Param } from '@nestjs/common';
import { SubstrateService } from 'services/substrate.service';

@Controller('balances')
export class BalancesController {
    constructor(private readonly substrateService: SubstrateService) {}

    @Get(":ss58")
    getBalanceRoute(@Param("ss58") ss58: string): Promise<Object> {
        return this.substrateService.getBalance(ss58);
    }
}
