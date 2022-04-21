import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit, WalletContract } from "@taquito/taquito";

interface UpdateContractProps {
  contract: WalletContract | any;
  Tezos: TezosToolkit;
}

const UpdateContract = ({ contract, Tezos }: UpdateContractProps) => {
  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);
  const [domainName, setDomainName] = useState<string>("");
  const [controllerId, setControllerId] = useState<string>("");
  const [merkleTreeRootHash, setMerkleTreeRootHash] = useState<string>("");


  const create = async (): Promise<void> => {
    setLoadingCreate(true);
    try {
      const op = await contract.methods.create_controller(controllerId,domainName,merkleTreeRootHash).send();
      await op.confirmation().then(() => console.log(op.opHash));
      window.alert(`Operation injected: https://hangzhou.tzstats.com/${op.opHash}`)
      const newStorage: any = await contract.storage();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCreate(false);
    }
  };


  if (!contract) return <div>&nbsp;</div>;
  return (
    <div className="buttons">
      <div>
        {loadingCreate ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
          </span>
        ) : (
          <div>
            <div>
              <div>Controller id</div>
              <input
                type="text"
                placeholder="ControllerID"
                value={controllerId}
                onChange={e => setControllerId(e.target.value)}
              />
            </div>
            <div>
              <div>Domain ID</div>
              <input
                type="text"
                placeholder="Domain Id"
                value={domainName}
                onChange={e => setDomainName(e.target.value)}
              />
            </div>
            <div>
              <div>Merkle tree root hash</div>
              <input
                type="text"
                placeholder="Merkle tree root hash"
                value={merkleTreeRootHash}
                onChange={e => setMerkleTreeRootHash(e.target.value)}
              />
            </div>
            <button className="button" disabled= {loadingCreate} onClick={create}>Create</button>
          </div>  
        )}
      </div>
      
    </div>
  );
};

export default UpdateContract;
