const mongoose = require("mongoose");

const notifSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  pengajuan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pengajuan",
    required: "false",
  },
  role_target: {
    type: String,
    enum: ["Admin", "Kabid", "Sarpas"],
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

module.exports = mongoose.model("Notifikasi", notifSchema);
