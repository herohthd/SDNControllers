import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit, WalletContract } from "@taquito/taquito";

interface UpdateMerkleTreeProps {
  contract: WalletContract | any;
  Tezos: TezosToolkit;
}

const UpdateMerkleTree = ({ contract, Tezos}: UpdateMerkleTreeProps) => {
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [controllerId, setControllerId] = useState<string>("");
  const [merkleTreeRootHash, setMerkleTreeRootHash] = useState<string>("");


  const update = async (): Promise<void> => {
    setLoadingUpdate(true);
    try {
      const op = await contract.methods.update_merkle_tree_root_hash(controllerId,merkleTreeRootHash).send();
      await op.confirmation();
      window.alert(`Operation injected: https://hangzhou.tzstats.com/${op.opHash}`)
      const newStorage: any = await contract.storage();
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
              <div>Controller id</div>
              <input
                type="text"
                placeholder="ControllerID"
                value={controllerId}
                onChange={e => setControllerId(e.target.value)}
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
            <button className="button" disabled= {loadingUpdate} onClick={update}>Update</button>
          </div>  
        )}
      </div>
      
    </div>
  );
};

export default UpdateMerkleTree;
