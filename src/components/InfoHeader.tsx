import React from "react";
import { useStoreState } from "../store/globalStore";

const InfoHeader: React.FunctionComponent = () => {
  const { account, network } = useStoreState((state) => state);

  return (
    <div className="header">
      <div className="title">Biconomy Gas Estimator</div>
      <div className="wallet-address">
        {account ? `(${network}) ${account}` : "connect wallet to continue"}
      </div>
    </div>
  );
};

export default InfoHeader;
