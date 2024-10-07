// backend/utils/blockchain.js
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.infura.io/v3/YOUR_INFURA_PROJECT_ID"
);
const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

const contractABI = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../smartContracts/TokenForageABI.json"))
);
const contractAddress = "YOUR_CONTRACT_ADDRESS";

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

module.exports = contract;
