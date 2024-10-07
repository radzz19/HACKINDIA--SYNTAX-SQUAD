// backend/controllers/marketplaceController.js
const Token = require("../models/Token");
const Transaction = require("../models/Transaction");

// @desc    Get all tokens
// @route   GET /api/marketplace
// @access  Public
exports.getTokens = async (req, res) => {
  try {
    const tokens = await Token.find();
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a new token
// @route   POST /api/marketplace
// @access  Private
exports.createToken = async (req, res) => {
  const { name, symbol, totalSupply } = req.body;

  try {
    const token = await Token.create({
      name,
      symbol,
      totalSupply,
      owner: req.user._id,
    });

    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Buy a token
// @route   POST /api/marketplace/buy
// @access  Private
exports.buyToken = async (req, res) => {
  const { tokenId, amount } = req.body;

  try {
    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    // Implement buying logic (e.g., interact with blockchain)

    const transaction = await Transaction.create({
      from: req.user.walletAddress,
      to: token.owner,
      amount,
      token: token._id,
    });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Sell a token
// @route   POST /api/marketplace/sell
// @access  Private
exports.sellToken = async (req, res) => {
  const { tokenId, amount } = req.body;

  try {
    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    // Implement selling logic (e.g., interact with blockchain)

    const transaction = await Transaction.create({
      from: token.owner,
      to: req.user.walletAddress,
      amount,
      token: token._id,
    });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
