const express = require("express");
const router = express.Router();
const {
  getNotifikasiByUser,
  markAsRead,
  getUnreadByRole,
  getUnreadCountByUser,
} = require("../controllers/notifikasiController");

router.get("/user/:userId", getNotifikasiByUser);
router.put("/read/:id", markAsRead);
router.get("/unread", getUnreadByRole);
router.get("/unread/count/:userId", getUnreadCountByUser);

module.exports = router;
