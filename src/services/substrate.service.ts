import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PolkadotJs } from 'utils/polkadotjs.utils';

@Injectable()
export class SubstrateService {
  // static getBalance: any;
  constructor(private configService: ConfigService) {}

  async getBalance(ss58: string): Promise<Object> {
    const {polkadotApi} = new PolkadotJs();
        const api = await polkadotApi(this.configService.get<string>("PROVIDER_SOCKET"));
        // Retrieve last block timestamp, account nonce & balances
        const [now, { nonce, data: balance }] = await Promise.all([
          api.query.timestamp.now(),
          api.query.system.account(ss58)
        ]);
        return {now, nonce, data: balance.toHuman()}
  }
}
