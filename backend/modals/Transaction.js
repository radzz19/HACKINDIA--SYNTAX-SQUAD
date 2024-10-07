const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  token: { type: mongoose.Schema.Types.ObjectId, ref: "Token" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
