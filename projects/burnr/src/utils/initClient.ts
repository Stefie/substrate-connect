
// @TODO bundle multiple clients in substrate-connect
import { SmoldotProvider }  from '@substrate/smoldot-provider';

import westendConfig from '../assets/westend.json';
console.log('westendConfig', westendConfig)

//console.log('Smoldot', new SmoldotProvider())

import { ClientConfig, LightClient, WasmRpcClient } from './types';
import { clients } from './../client-specs'; 

let client: WasmRpcClient;

/**
 * Create a light client by fetching the WASM blob from an URL.
 */
export function initClient(config: string): LightClient {
  return {
    name: 'westend2',
    async startClient(): Promise<WasmRpcClient> {
      if (client) {
        return client;
      }
      console.log("Loading Smoldot Westend light client")
      // Dynamic import, because the JSON is quite big.
      // Pattern to enable dynamic imports in Webpack see:
      const { default: chainSpec } = await import('../assets/westend.json');
      console.log('JSON.stringify(chainSpec)', JSON.stringify(chainSpec))

      client = await start_client(JSON.stringify(chainSpec), 'INFO');

      return client;
    },
    version: clients[config].version
  };
}
