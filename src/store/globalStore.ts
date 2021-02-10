import { Action, action, createTypedHooks } from "easy-peasy";

export interface IGlobalStore {
  web3: any;
  account: string;
  network: string;
  connected: boolean;
  shouldUpdate: boolean;

  // actions
  setWeb3: Action<IGlobalStore, any>;
  setAccount: Action<IGlobalStore, string>;
  setNetwork: Action<IGlobalStore, string>;
  setConnected: Action<IGlobalStore, boolean>;
  setShouldUpdate: Action<IGlobalStore, boolean>;
}

const globalStore: IGlobalStore = {
  web3: null,
  account: "",
  network: "",
  connected: false,
  shouldUpdate: false,

  // actions
  setWeb3: action((state, payload: any) => {
    state.web3 = payload;
  }),

  setAccount: action((state, payload: string) => {
    state.account = payload;
  }),

  setNetwork: action((state, payload: string) => {
    state.network = payload;
  }),

  setConnected: action((state, payload: boolean) => {
    state.connected = payload;
  }),

  setShouldUpdate: action((state, payload: boolean) => {
    state.shouldUpdate = payload;
  }),
};

export default globalStore;

const { useStoreActions, useStoreState } = createTypedHooks<IGlobalStore>();
export { useStoreActions, useStoreState };
