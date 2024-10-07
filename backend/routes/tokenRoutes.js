const express = require("express");
const { mintToken, burnToken } = require("../controllers/TokenController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/mint", protect, mintToken);
router.post("/burn", protect, burnToken);

module.exports = router;
