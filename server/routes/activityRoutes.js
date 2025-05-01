const express = require("express");
const router = express.Router();
const { logLogin, getAllLogins } = require("../controllers/activityController");

router.post("/log", logLogin);
router.get("/", getAllLogins);

module.exports = router;
