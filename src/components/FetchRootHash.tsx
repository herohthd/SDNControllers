import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit, WalletContract } from "@taquito/taquito";

interface FetchRootHashProps {
  contract: WalletContract | any;
  Tezos: TezosToolkit;
}

const FetchRootHash = ({ contract, Tezos}: FetchRootHashProps) => {
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [controllerId, setControllerId] = useState<string>("");
  const [rootHash, setRootHash] = useState<string>("");

  const fetch = async (): Promise<void> => {
    setLoadingUpdate(true);
    try {
        Tezos.contract
        .at('KT1WkcTdLjvRpgfytLhAZcQx2ZhwtS9tFLko')
        .then((myContract) => {
          return myContract
            .storage()
            .then((myStorage : any) => {
              //When called on a bigMap, the get method returns a promise
              return myStorage['controllers'].get(controllerId);
            })
            .then((valueBigMap) => {
              console.log(valueBigMap.merkle_tree_root_hash);
              setRootHash(valueBigMap.merkle_tree_root_hash)
            });
        })
        .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
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
            <button className="button" disabled= {loadingUpdate} onClick={fetch}>Fetch</button>
            <div>The merkle tree root hash of {controllerId} is <b>{rootHash}</b></div>
          </div>  
        )}
      </div>
      
    </div>
  );
};

export default FetchRootHash;
