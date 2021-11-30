import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PolkadotJs } from 'utils/polkadotjs.utils';

@Controller()
export class RootController {
    constructor(private configService: ConfigService) {}
    @Get()
    async connectSubstrate(): Promise<string> {
        const {polkadotApi} = new PolkadotJs();
        const api = await polkadotApi(this.configService.get<string>("PROVIDER_SOCKET"));
        return "Heya Hotel Manager connected to Substrate node with genesis block hash: "+api.genesisHash.toHex();
    }
}
