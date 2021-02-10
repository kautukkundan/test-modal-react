import DAI_kovan_contract from "../contracts/DAI_kovan.json";
import USDT_kovan_contract from "../contracts/USDT_kovan.json";
import USDC_kovan_contract from "../contracts/USDC_kovan.json";
import { useStoreState, useStoreActions } from "../store/globalStore";
import Swal from "sweetalert2";

const useContracts = () => {
  const { web3, account } = useStoreState((state) => state);
  const { setShouldUpdate } = useStoreActions((actions) => actions);

  const BINANCE_CONTRACT = "0xbc4de0Fa9734af8DB0fA70A24908Ab48F7c8D75d";

  const getContractInstance = (erc20token: "DAI" | "USDT" | "USDC") => {
    if (erc20token === "USDC") {
      return new web3.eth.Contract(
        USDC_kovan_contract.abi,
        USDC_kovan_contract.address
      );
    } else if (erc20token === "USDT") {
      return new web3.eth.Contract(
        USDT_kovan_contract.abi,
        USDC_kovan_contract.address
      );
    } else if (erc20token === "DAI") {
      return new web3.eth.Contract(
        DAI_kovan_contract.abi,
        DAI_kovan_contract.address
      );
    }
  };

  const approveToken = async (erc20token: "DAI" | "USDT" | "USDC") => {
    let maxValue =
      "115792089237316195423570985008687907853269984665640564039457584007913129639935";

    let TokenContractInstance = getContractInstance(erc20token);

    TokenContractInstance.methods
      .approve(BINANCE_CONTRACT, maxValue)
      .send({
        from: account,
      })
      .on("error", function () {
        Swal.fire("reverted", "Tx has been cancelled by user", "error");
      })
      .on("transactionHash", function (hash: any) {
        Swal.fire("Success!", "Allowance Tx Submitted", "success");
      })
      .on("receipt", function (receipt: any) {
        setShouldUpdate(true);
      });
  };

  const checkAllowance = async (erc20token: "DAI" | "USDT" | "USDC") => {
    let TokenContractInstance = getContractInstance(erc20token);

    let allowance = await TokenContractInstance.methods
      .allowance(account, BINANCE_CONTRACT)
      .call();
    if (allowance > 0) {
      return true;
    } else {
      return false;
    }
  };

  return {
    approveToken,
    checkAllowance,
  };
};

export default useContracts;
