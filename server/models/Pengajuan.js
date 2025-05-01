const mongoose = require("mongoose");

const pengajuanSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  kode_barang: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventaris",
    required: false,
  },
  nama_barang: {
    type: String,
    required: function () {
      return this.jenis_pengajuan === "permintaan";
    },
  },
  alasan: {
    type: String,
    required: function () {
      return this.jenis_pengajuan === "permintaan";
    },
  },
  jumlah_barang: { type: Number, required: true },
  jenis_pengajuan: {
    type: String,
    enum: ["Peminjaman", "Permintaan", "Pengembalian", "Perpanjangan"],
    required: true,
  },
  tgl_pengajuan: { type: Date, default: Date.now },
  batas_kembali: { type: Date },
  status: {
    type: String,
    enum: ["Proses", "Diterima", "Ditolak"],
    default: "proses",
  },
  id_peminjaman: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pengajuan",
    required: function () {
      return this.jenis_pengajuan === "pengembalian";
    },
  },
});

module.exports = mongoose.model("Pengajuan", pengajuanSchema);
