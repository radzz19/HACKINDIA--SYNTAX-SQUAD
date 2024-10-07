// src/components/ResourceManager.js
import React, { useEffect, useState } from "react";
import getWeb3 from "../web3";
import MyContract from "../MyContract.json"; // Your smart contract's ABI

const ResourceManager = () => {
  const [contract, setContract] = useState(null);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const initWeb3 = async () => {
      const web3 = await getWeb3();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MyContract.networks[networkId];
      const contractInstance = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
      );
      setContract(contractInstance);
      // Load resources or other necessary data here if needed
    };

    initWeb3();
  }, []);

  const fetchResource = async () => {
    if (!contract) return;

    try {
      const response = await contract.methods.yourMethodName().call();
      console.log("Resources fetched:", response);
      setResources(response);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const sendTransaction = async (transactionData) => {
    if (!contract) return;

    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();

    try {
      const response = await contract.methods
        .yourMethodName(transactionData)
        .send({ from: accounts[0] });
      console.log("Transaction successful:", response);
      // Optionally refresh resources or handle post-transaction logic
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchResource}>Fetch Resources</button>
      {/* Render resources or provide functionality to send transactions */}
    </div>
  );
};

export default ResourceManager;
