import React, { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from '@taquito/signer'
import "./App.css";
import ConnectButton from "./components/ConnectWallet";
import DisconnectButton from "./components/DisconnectWallet";
import qrcode from "qrcode-generator";
import CreateController from "./components/CreateController";
import RemoveController from "./components/RemoveController";
import UpdateMerkleTree from "./components/UpdateMerkleTree";
import AddDomain from "./components/AddDomain";
import RemoveDomain from "./components/RemoveDomain";
import FetchRootHash from "./components/FetchRootHash";


enum BeaconConnection {
  NONE = "",
  LISTENING = "Listening to P2P channel",
  CONNECTED = "Channel connected",
  PERMISSION_REQUEST_SENT = "Permission request sent, waiting for response",
  PERMISSION_REQUEST_SUCCESS = "Wallet is connected"
}


const App = () => {
  const [Tezos, setTezos] = useState<TezosToolkit>(
    new TezosToolkit("https://ithacanet.ecadinfra.com")
  );
  const [contract, setContract] = useState<any>(undefined);
  const [activeTab, setActiveTab] = useState<string>("transfer");
  
  InMemorySigner.fromSecretKey('edskRct6PKTooCVi5BxjybuVkAL3YKrcKV5TXEdd2p13557TN81VhpjsXJTWxfPVMBjQYgHCtKFzZafhxPibDasNuzGPQusJjL')
  .then((theSigner) => {
    Tezos.setProvider({ signer: theSigner });
    //We can access the public key hash
    return Tezos.signer.publicKeyHash();
  })
  .then((publicKeyHash) => {
    console.log(`The public key hash associated is: ${publicKeyHash}.`);
  })
  .catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));
  
  // Ithacanet SDN Controller
  const contractAddress: string = "KT1HCT2dCfaXTW11fH8LXoFCHwAKiR827qAF";
  // Hangzhounet SDN controller
  // const contractAddress: string = "KT1WkcTdLjvRpgfytLhAZcQx2ZhwtS9tFLko";

  if (contract) {
    return (
      <div className="main-box">
        <h1>Taquito Boilerplate</h1>
        <div id="tabs">
          <div
            id="create"
            className={activeTab === "create" ? "active" : ""}
            onClick={() => setActiveTab("create")}
          >
            Create controller
          </div>
          <div
            id="remove controller"
            className={activeTab === "remove controller" ? "active" : ""}
            onClick={() => setActiveTab("remove controller")}
          >
            Remove controller
          </div>
          <div
            id="update"
            className={activeTab === "update" ? "active" : ""}
            onClick={() => setActiveTab("update")}
          >
            Update Merkle tree root hash
          </div>
          <div
            id="fetch"
            className={activeTab === "fetch" ? "active" : ""}
            onClick={() => setActiveTab("fetch")}
          >
            Fetch Merkle tree root hash
          </div>
          <div
            id="add"
            className={activeTab === "add" ? "active" : ""}
            onClick={() => setActiveTab("add")}
          >
            Add domain
          </div>
          <div
            id="remove"
            className={activeTab === "remove" ? "active" : ""}
            onClick={() => setActiveTab("remove")}
          >
            Remove domain
          </div>
        </div>
        <div id="dialog">
          <div id="content">
            {activeTab === "create" ? (
              <div id="creates">
                <h3 className="text-align-center">Create controller</h3>
                <CreateController
                  contract={contract}
                  Tezos={Tezos}
                />
              </div>
            ) : activeTab === "remove controller" ? (
              <div id="increment-decrement">
                <h3 className="text-align-center">
                  <span>Remove controller</span>
                </h3>
                <RemoveController
                  contract={contract}
                  Tezos={Tezos}
                />
              </div>
            ) : activeTab === "update" ? (
              <div id="increment-decrement">
                <h3 className="text-align-center">
                  <span>Update merkle tree root hash</span>
                </h3>
                <UpdateMerkleTree
                  contract={contract}
                  Tezos={Tezos}
                />
              </div>
            ) : activeTab === "fetch" ? (
              <div id="increment-decrement">
                <h3 className="text-align-center">
                  <span>Fetch merkle tree root hash</span>
                </h3>
                <FetchRootHash
                  contract={contract}
                  Tezos={Tezos}
                />
              </div>
            ): activeTab === "add" ? (
              <div id="increment-decrement">
                <h3 className="text-align-center">
                  <span>Add SDN domain</span>
                </h3>
                <AddDomain
                  contract={contract}
                  Tezos={Tezos}
                />
              </div>
            ) : (
              <div id="increment-decrement">
                <h3 className="text-align-center">
                  <span>Remove SDN domain</span>
                </h3>
                <RemoveDomain
                  contract={contract}
                  Tezos={Tezos}
                />
              </div>
            ) }
            <p>
              <i className="far fa-file-code"></i>&nbsp;
              <a
                href={`https://better-call.dev/hangzhounet/${contractAddress}/operations`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contractAddress}
              </a>
            </p>
          </div>
        </div>
        <div id="footer">
          <img src="built-with-taquito.png" alt="Built with Taquito" />
        </div>
      </div>
    );
  } else if (!contract) {
    return (
      <div className="main-box">
        <div className="title">
          <h1>Taquito Boilerplate</h1>
          <a href="https://app.netlify.com/start/deploy?repository=https://github.com/ecadlabs/taquito-boilerplate">
            <img
              src="https://www.netlify.com/img/deploy/button.svg"
              alt="netlify-button"
            />
          </a>
        </div>
        <div id="dialog">
          <header>Welcome to Taquito Boilerplate App!</header>
          <div id="content">
            <p>Hello!</p>
            <p>
              This is a template Tezos dApp built using Taquito. It's a starting
              point for you to hack on and build your own dApp for Tezos.
              <br />
              If you have not done so already, go to the{" "}
              <a
                href="https://github.com/ecadlabs/taquito-boilerplate"
                target="_blank"
                rel="noopener noreferrer"
              >
                Taquito boilerplate Github page
              </a>{" "}
              and click the <em>"Use this template"</em> button.
            </p>
            <p>Go forth and Tezos!</p>
          </div>
          <ConnectButton
            Tezos={Tezos}
            setContract={setContract}
            contractAddress={contractAddress}
          />
        </div>
        <div id="footer">
          <img src="built-with-taquito.png" alt="Built with Taquito" />
        </div>
      </div>
    );
  } else {
    return <div>An error has occurred</div>;
  }
};

export default App;
