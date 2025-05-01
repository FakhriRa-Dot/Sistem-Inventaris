const Notifikasi = require("../models/Notifikasi");

const getNotifikasiByRole = async (req, res) => {
  try {
    const { role } = req.query;
    const notifikasi = await Notifikasi.find({ role_target: role }).sort({
      createdAt: -1,
    });
    res.status(200).json(notifikasi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil notifikasi" });
  }
};

const tandaiSudahDibaca = async (req, res) => {
  try {
    const { id } = req.params;
    await Notifikasi.findByIdAndUpdate(id, { read: true });
    res
      .status(200)
      .json({ message: "Notifikasi ditandai sebagai sudah dibaca" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memperbarui notifikasi" });
  }
};

const getBelumDibaca = async (req, res) => {
  try {
    const { role } = req.query;
    const count = await Notifikasi.countDocuments({
      role_target: role,
      read: false,
    });
    res.status(200).json({ unreadCount: count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

const hapusNotifikasi = async (req, res) => {
  try {
    const { id } = req.params;
    await Notifikasi.findByIdAndDelete(id);
    res.status(200).json({ message: "Notifikasi dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus notifikasi" });
  }
};

module.exports = {
  getNotifikasiByRole,
  tandaiSudahDibaca,
  hapusNotifikasi,
  getBelumDibaca,
};
