import React from "react";
import "./App.css";

import globalStore, { IGlobalStore } from "./store/globalStore";
import { createStore, StoreProvider } from "easy-peasy";

import InfoHeader from "./components/InfoHeader";
import ConnectWeb3 from "./components/ConnectWeb3";
import GasModal from "./components/GasModal";

const store = createStore<IGlobalStore>(globalStore);

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <div className="main-card">
          <InfoHeader />
          <div className="body">
            <ConnectWeb3 />
            <GasModal />
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}

export default App;
