// Copyright 2018-2020 @paritytech/substrate-light-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// eslint-disable-next-line @typescript-eslint/camelcase
import init, { start_client } from './polkadot/polkadot_cli';
import { LightClient, WasmRpcClient } from './types';

let client: WasmRpcClient;
const name = 'polkadot_local';
const version = 'v0.8.25';
/**
 * Create a light client by fetching the WASM blob from an URL.
 */
export function initClient(): LightClient {
  return {
    name,
    async startClient(): Promise<WasmRpcClient> {
      if (client) {
        return client;
      }

      console.log(`Initializing ${name} Wasm light client from "./polkadot_cli_bg.wasm" ...`);
      await init('./polkadot/polkadot_cli_bg.wasm');
      console.log('Successfully loaded WASM, starting client from "./polkadotLocal.wasm"...');
    
      // Dynamic import, because the JSON is quite big.
      // Pattern to enable dynamic imports in Webpack see:
      // https://github.com/webpack/webpack/issues/6680#issuecomment-370800037
      const { default: chainSpec } = await import('./polkadot/polkadot-local.json');

      client = await start_client(JSON.stringify(chainSpec), 'INFO');

      return client;
    },
    version
  };
}