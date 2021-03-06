import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import {KeyringPair} from '@polkadot/keyring/types';
import {u8aToHex} from '@polkadot/util';
import {mnemonicGenerate} from '@polkadot/util-crypto';
import {KeypairType} from '@polkadot/util-crypto/types';

export class PolkadotJs {

    async polkadotApi(
      wssAddress: string,
      typesBundle = {},
    ): Promise<ApiPromise> {
      try {
        const provider = new WsProvider(wssAddress, false);
        provider.connect() as Promise<void>;
        const api = await new ApiPromise({provider, typesBundle: typesBundle})
        .isReadyOrError;
        return api;
        
      } catch (e) {
        throw new Error("Lost Connection To RPC");
      }
    }
  
    // async getSystemParameters(api: ApiPromise) {
    //   const params = await api.rpc.system.properties();
    //   const decimals = params.tokenDecimals.value.toHuman() as string[];
    //   const symbols = params.tokenSymbol.value.toHuman() as AnyObject;
    //   const symbolsDecimals = symbols.reduce(
    //     (acc, symbol, index) => ({
    //       ...acc,
    //       [symbol]: +decimals[index],
    //     }),
    //     {},
    //   );
  
    //   return {
    //     decimals: decimals as string[],
    //     symbols: symbols as string[],
    //     symbolsDecimals: symbolsDecimals as string[],
    //   };
    // }
  
    getKeyring(type = 'sr25519', addressFormat = 42): Keyring {
      return new Keyring({
        type: type as KeypairType,
        ss58Format: addressFormat,
      });
    }
  
    getHexPublicKey(keyring: KeyringPair): string {
      return u8aToHex(keyring.publicKey);
    }
  
    generateSeed(): string {
      return mnemonicGenerate();
    }
  }