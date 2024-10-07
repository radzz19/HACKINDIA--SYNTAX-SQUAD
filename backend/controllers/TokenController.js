const Token = require("../models/Token");
const Transaction = require("../models/Transaction");
const contract = require("../utils/blockchain");

exports.mintToken = async (req, res) => {
  try {
    const { to, amount } = req.body;

    // Call the mint function from the contract
    const transaction = await contract.mint(
      to,
      ethers.utils.parseUnits(amount.toString(), 18)
    );
    await transaction.wait(); // Wait for confirmation

    // Save transaction details in the database
    const newTransaction = await Transaction.create({
      from: contract.signer.address,
      to,
      amount,
      token: token._id, // assuming token is fetched or passed as parameter
      transactionHash: transaction.hash,
    });

    res
      .status(200)
      .json({
        success: true,
        transactionHash: transaction.hash,
        newTransaction,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Minting failed" });
  }
};

exports.burnToken = async (req, res) => {
  try {
    const { from, amount } = req.body;

    // Call the burn function from the contract
    const transaction = await contract.burn(
      from,
      ethers.utils.parseUnits(amount.toString(), 18)
    );
    await transaction.wait();

    res.status(200).json({ success: true, transactionHash: transaction.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Burning failed" });
  }
};
