import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit, WalletContract } from "@taquito/taquito";

interface AddDomainProps {
  contract: WalletContract | any;
  setUserBalance: Dispatch<SetStateAction<any>>;
  Tezos: TezosToolkit;
  userAddress: string;
  setStorage: Dispatch<SetStateAction<number>>;
}

const AddDomain = ({ contract, setUserBalance, Tezos, userAddress, setStorage }: AddDomainProps) => {
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [domainName, setDomainName] = useState<string>("");
  const [domainAddress, setDomainAddress] = useState<string>("");


  const add = async (): Promise<void> => {
    setLoadingUpdate(true);
    try {
      const op = await contract.methods.add_domain(domainAddress,domainName).send();
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
              <div>Domain name</div>
              <input
                type="text"
                placeholder="domain name"
                value={domainName}
                onChange={e => setDomainName(e.target.value)}
              />
            </div>
            <div>
              <div>Domain address</div>
              <input
                type="text"
                placeholder="domain address"
                value={domainAddress}
                onChange={e => setDomainAddress(e.target.value)}
              />
            </div>
            <button className="button" disabled= {loadingUpdate} onClick={add}>Add</button>
          </div>  
        )}
      </div>
      
    </div>
  );
};

export default AddDomain;
