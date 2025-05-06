const Inventaris = require("../models/Inventaris");

const getInventaris = async (req, res) => {
  try {
    const data = await Inventaris.find().sort({ tgl_masuk: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getInventarisById = async (req, res) => {
  try {
    const data = await Inventaris.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Inventaris not found" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const tambahInventaris = async (req, res) => {
  try {
    const {
      nama_barang,
      tipe_barang,
      kondisi_barang,
      tgl_masuk,
      sumber,
      jumlah,
    } = req.body;

    const existingItem = await Inventaris.findOne({ nama_barang, tipe_barang });
    if (existingItem) {
      const jumlahBaru = Number(jumlah);
      existingItem.jumlah += jumlahBaru;
      existingItem.jumlah_awal += jumlahBaru; // update juga jumlah_awal
      existingItem.tgl_masuk = tgl_masuk;
      existingItem.kondisi_barang = kondisi_barang;
      existingItem.sumber = sumber;

      await existingItem.save();
      return res.status(200).json({
        message: "Inventaris updated successfully",
        data: existingItem,
      });
    }

    const newData = new Inventaris({
      nama_barang,
      tipe_barang,
      kondisi_barang,
      tgl_masuk,
      sumber,
      jumlah,
      jumlah_awal: jumlah,
    });

    await newData.save();
    res.status(201).json({
      message: "Inventaris added successfully",
      data: newData,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateInventaris = async (req, res) => {
  try {
    const { jumlah_awal, ...safeBody } = req.body;

    const updated = await Inventaris.findByIdAndUpdate(
      req.params.id,
      safeBody,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Inventaris not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteInventaris = async (req, res) => {
  try {
    const deleted = await Inventaris.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Inventaris not found" });
    res.status(200).json({ message: "Inventaris deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getInventarisStats = async (req, res) => {
  try {
    const tersedia = await Inventaris.countDocuments({ status: "Tersedia" });
    const dipinjam = await Inventaris.countDocuments({ status: "Dipinjam" });

    res.json({
      tersedia,
      dipinjam,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err });
  }
};

const getTipeBarangList = async (req, res) => {
  try {
    const tipeList = await Inventaris.distinct("tipe_barang");
    res.json(tipeList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tipe barang list", error });
  }
};

const getSumberList = async (req, res) => {
  try {
    const sumberList = await Inventaris.distinct("sumber");
    res.json(sumberList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sumber list", error });
  }
};

const getKondisiBarangList = async (req, res) => {
  const list = await Inventaris.distinct("kondisi_barang");
  res.json(list);
};

const getLaporanInventaris = async (req, res) => {
  try {
    const data = await Inventaris.find();
    const totalJumlahAwal = data.reduce(
      (sum, item) => sum + (item.jumlah_awal || 0),
      0
    );

    res.status(200).json({
      total_jumlah_awal: totalJumlahAwal,
      data,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal memuat laporan inventaris", error: err });
  }
};

module.exports = {
  getInventaris,
  getInventarisById,
  tambahInventaris,
  updateInventaris,
  deleteInventaris,
  getTipeBarangList,
  getInventarisStats,
  getSumberList,
  getTipeBarangList,
  getKondisiBarangList,
  getLaporanInventaris,
};
