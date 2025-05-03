const Notifikasi = require("../models/Notifikasi");

const getNotifikasiByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || userId === "undefined") {
      return res.status(400).json({ message: "User ID tidak valid" });
    }

    const notifikasi = await Notifikasi.find({ userTarget: userId }).sort({
      createdAt: -1,
    });

    res.json(notifikasi);
  } catch (error) {
    console.error("Error getNotifikasiByUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notifikasi.findByIdAndUpdate(id, { read: true });
    res.status(200).json({ message: "Notifikasi ditandai sebagai dibaca" });
  } catch (error) {
    console.error("Error markAsRead:", error);
    res.status(500).json({ message: "Gagal menandai notifikasi" });
  }
};

const getUnreadByRole = async (req, res) => {
  const role = req.query.role;

  try {
    const unread = await Notifikasi.find({ role, read: false });
    res.json(unread);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotifikasiByUser,
  markAsRead,
  getUnreadByRole,
};
