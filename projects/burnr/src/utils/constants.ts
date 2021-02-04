import { WsProvider } from '@polkadot/api';
import { ProviderInterface } from '@polkadot/rpc-provider/types';

import { LazyProvider } from './types'; 

/**
 * Temporary hard-coded work around to test Wasm Light client 
 * until @substrate/connect is properly implemented
 */

export const endpoints = {
  'kusama': 'wss://kusama-rpc.polkadot.io/',
  'polkadot': 'wss://rpc.polkadot.io',
  'westend': 'wss://westend-rpc.polkadot.io',
  'localPolkadotNetwork': 'ws://127.0.0.1:9945',
  'local': 'ws://127.0.0.1:9944'
};

export const users = {
  'kusama': 'CzugcapJWD8CEHBYHDeFpVcxfzFBCg57ic72y4ryJfXUnk7',
  'polkadot': '11uMPbeaEDJhUxzU4ZfWW9VQEsryP9XqFcNRfPdYda6aFWJ',
  'westend': '12gG5fz9A7k7CgZeis8JesCoZiARDioonHYp5W9Vkwc6nFyB'
}

export const SMOLDOT_PROVIDERS: Record<string, LazyProvider> = {
  'Westend-Wasm-Light-Node': {
    description: 'Local Smoldot client for Westend',
    id: 'Westend-Smoldot',
    network: 'Westend',
    node: 'light',
    source: 'browser',
    endpoint: 'Light client running in Browser',
    // start: (): Promise<ProviderInterface> =>
    //   Promise.resolve(new SmoldotProvider(westendConfig)),
    transport: 'WasmProvider',
  },
};

/**
 * These fallback providers connect to a centralized remote RPC node.
 */
export const REMOTE_PROVIDERS: Record<string, LazyProvider> = {
  'Polkadot-Local-WsProvider': {
    description: `Local node running on ${endpoints.local}`,
    id: 'Polkadot-Local-WsProvider',
    network: 'Local Polkadot Network',
    node: 'light',
    source: 'remote',
    endpoint: endpoints.local,
    client: 'Websocket remote',
    start: (): Promise<ProviderInterface> =>
      Promise.resolve(new WsProvider(endpoints.local)),
    transport: 'WsProvider',
  },
  'Polkadot-WsProvider': {
    description: 'Remote node hosted by W3F',
    id: 'Polkadot-WsProvider',
    network: 'Polkadot',
    node: 'light',
    source: 'remote',
    endpoint: endpoints.polkadot,
    client: 'Websocket remote',
    start: (): Promise<ProviderInterface> =>
      Promise.resolve(new WsProvider(endpoints.polkadot)),
    transport: 'WsProvider',
  },
  'Kusama-WsProvider': {
    description: 'Remote node hosted by W3F',
    id: 'Kusama-WsProvider',
    network: 'Kusama',
    node: 'light',
    source: 'remote',
    endpoint: endpoints.kusama,
    client: 'Websocket remote',
    start: (): Promise<ProviderInterface> =>
      Promise.resolve(new WsProvider(endpoints.kusama)),
    transport: 'WsProvider',
  },
  'Westend-WsProvider': {
    description: 'Remote node hosted by W3F',
    id: 'Westend-WsProvider',
    network: 'Westend',
    node: 'light',
    source: 'remote',
    endpoint: endpoints.westend,
    client: 'Websocket remote',
    start: (): Promise<ProviderInterface> =>
      Promise.resolve(new WsProvider(endpoints.westend)),
    transport: 'WsProvider',
  },
};

export const ALL_PROVIDERS = {...REMOTE_PROVIDERS, ...SMOLDOT_PROVIDERS};