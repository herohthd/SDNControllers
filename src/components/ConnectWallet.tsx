import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks
} from "@airgap/beacon-sdk";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import { LedgerSigner } from "@taquito/ledger-signer";

type ButtonProps = {
  Tezos: TezosToolkit;
  setContract: Dispatch<SetStateAction<any>>;
  contractAddress: string;
};

const ConnectButton = ({
  Tezos,
  setContract,
  contractAddress,
}: ButtonProps): JSX.Element => {
  const [loadingNano, setLoadingNano] = useState<boolean>(false);

  const setup = async (): Promise<void> => {
    // creates contract instance
    const contract = await Tezos.wallet.at(contractAddress);
    setContract(contract);
  };

  const connectWallet = async (): Promise<void> => {
      await setup();
  };


  useEffect(() => {
    (async () => {
        await setup();
    })();
  }, []);

  return (
    <div className="buttons">
      <button className="button" onClick={connectWallet}>
        <span>
          <i className="fas fa-wallet"></i>&nbsp; Connect with wallet
        </span>
      </button>
    </div>
  );
};

export default ConnectButton;
