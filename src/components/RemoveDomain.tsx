import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit, WalletContract } from "@taquito/taquito";

interface RemoveDomainProps {
  contract: WalletContract | any;
  setUserBalance: Dispatch<SetStateAction<any>>;
  Tezos: TezosToolkit;
  userAddress: string;
  setStorage: Dispatch<SetStateAction<number>>;
}

const RemoveDomain = ({ contract, setUserBalance, Tezos, userAddress, setStorage }: RemoveDomainProps) => {
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [domainAddress, setDomainAddress] = useState<string>("");


  const remove = async (): Promise<void> => {
    setLoadingUpdate(true);
    try {
      const op = await contract.methods.remove_domain(domainAddress).send();
      await op.confirmation();
      window.alert(`Operation injected: https://hangzhou.tzstats.com/${op.opHash}`)
      setUserBalance(await Tezos.tz.getBalance(userAddress));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpdate(false);
    }
  };


  if (!contract && !userAddress) return <div>&nbsp;</div>;
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
              <div>Domain address</div>
              <input
                type="text"
                placeholder="Domain address"
                value={domainAddress}
                onChange={e => setDomainAddress(e.target.value)}
              />
            </div>
            <button className="button" disabled= {loadingUpdate} onClick={remove}>Remove</button>
          </div>  
        )}
      </div>
      
    </div>
  );
};

export default RemoveDomain;
