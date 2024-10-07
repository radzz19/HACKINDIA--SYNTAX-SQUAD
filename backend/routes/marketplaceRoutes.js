// backend/routes/marketplaceRoutes.js
const express = require("express");
const {
  getTokens,
  createToken,
  buyToken,
  sellToken,
} = require("../controllers/marketplaceController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getTokens).post(protect, createToken);

router.route("/buy").post(protect, buyToken);
router.route("/sell").post(protect, sellToken);

module.exports = router;
