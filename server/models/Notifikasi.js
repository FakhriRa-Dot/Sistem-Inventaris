const mongoose = require("mongoose");

const NotifikasiSchema = new mongoose.Schema({
  userTarget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["Peminjaman", "Pengembalian", "Permintaan", "Perpanjangan"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notifikasi", NotifikasiSchema);
