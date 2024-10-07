import React, { useState } from "react";
import { burnToken } from "../services/tokenService";

const BurnToken = () => {
  const [from, setFrom] = useState("");
  const [amount, setAmount] = useState("");

  const handleBurn = async () => {
    try {
      const result = await burnToken(from, amount);
      alert("Burning successful! Tx Hash: " + result.transactionHash);
    } catch (error) {
      alert("Burning failed: " + error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Sender Address"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleBurn}>Burn Tokens</button>
    </div>
  );
};

export default BurnToken;
