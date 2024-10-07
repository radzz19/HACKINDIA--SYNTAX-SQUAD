// backend/controllers/blockchainController.js
const contract = require("../utils/blockchain");

// Example: Mint Tokens
exports.mintTokens = async (req, res) => {
  const { to, amount } = req.body;

  try {
    const tx = await contract.mint(
      to,
      ethers.utils.parseUnits(amount.toString(), 18)
    );
    await tx.wait();
    res.status(200).json({ message: "Tokens minted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Minting failed", error: error.message });
  }
};

// Similar functions for buyToken, sellToken interacting with the contract
