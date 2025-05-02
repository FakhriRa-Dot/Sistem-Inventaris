const express = require("express");
const router = express.Router();
const {
  logLogin,
  getAllLogins,
  getUserActivities,
} = require("../controllers/activityController");

router.post("/log", logLogin);
router.get("/", getAllLogins);
router.get("/user-activities", getUserActivities);

module.exports = router;
