import React, { useState } from "react";
import { mintToken } from "../services/tokenService";

const MintToken = () => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleMint = async () => {
    try {
      const result = await mintToken(to, amount);
      alert("Minting successful! Tx Hash: " + result.transactionHash);
    } catch (error) {
      alert("Minting failed: " + error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleMint}>Mint Tokens</button>
    </div>
  );
};

export default MintToken;
