import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit, WalletContract } from "@taquito/taquito";

interface RemoveControllerProps {
  contract: WalletContract | any;
  Tezos: TezosToolkit;
}

const RemoveController = ({ contract, Tezos}: RemoveControllerProps) => {
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [controllerId, setControllerId] = useState<string>("");


  const remove = async (): Promise<void> => {
    setLoadingUpdate(true);
    try {
      const op = await contract.methods.remove_controller(controllerId).send();
      await op.confirmation();
      window.alert(`Operation injected: https://hangzhou.tzstats.com/${op.opHash}`)
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpdate(false);
    }
  };


  if (!contract) return <div>&nbsp;</div>;
  return (
    <div className="buttons">
      <div>
        {loadingUpdate ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
          </span>
        ) : (
          <div>
            <div>
              <div>Controller Id</div>
              <input
                type="text"
                placeholder="Controller Id"
                value={controllerId}
                onChange={e => setControllerId(e.target.value)}
              />
            </div>
            <button className="button" disabled= {loadingUpdate} onClick={remove}>Remove</button>
          </div>  
        )}
      </div>
      
    </div>
  );
};

export default RemoveController;
