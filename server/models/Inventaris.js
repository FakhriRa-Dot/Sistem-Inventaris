const mongoose = require("mongoose");

const inventarisSchema = new mongoose.Schema(
  {
    nama_barang: {
      type: String,
      required: true,
    },
    tipe_barang: {
      type: String,
      required: true,
    },
    kondisi_barang: {
      type: String,
      enum: ["Baik", "Tidak Baik"],
      default: "Baik",
    },
    jumlah: {
      type: Number,
      required: true,
      default: 1,
    },
    tgl_masuk: {
      type: Date,
      required: true,
    },
    sumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Tersedia", "Dipinjam"],
      default: "Tersedia",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inventaris", inventarisSchema);
