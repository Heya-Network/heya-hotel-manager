import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PolkadotJs } from 'utils/polkadotjs.utils';

@Controller()
export class RootController {
    constructor(private configService: ConfigService) {}
    @Get()
    async connectSubstrate(): Promise<Object> {
        const {polkadotApi} = new PolkadotJs();
        const api = await polkadotApi(this.configService.get<string>("PROVIDER_SOCKET"));
        const chainName = await api.rpc.system.chain();
        const latestHeader = await api.rpc.chain.getHeader();
        return {
            "msg": "Heya Hotel Manager connected to Substrate",
            "genesis block hash": api.genesisHash.toHex(),
            chainName,
            latestHeader,
        }

    }
}
