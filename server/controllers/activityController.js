const LoginActivity = require("../models/Activity");
const Pengajuan = require("../models/Pengajuan");

exports.logLogin = async (req, res) => {
  try {
    const { user_id, name, role } = req.body;

    const log = await LoginActivity.create({ user_id, name, role });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllLogins = async (req, res) => {
  try {
    const { user_id } = req.query;

    const query = user_id
      ? { user_id: new mongoose.Types.ObjectId(user_id) }
      : {};

    const logs = await LoginActivity.find(query).sort({ login_time: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserActivities = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    const activities = await Pengajuan.find({ user_id })
      .sort({ tgl_pengajuan: -1 })
      .limit(10)
      .lean();

    const formatted = activities.map((item) => ({
      type: item.jenis_pengajuan,
      time: item.tgl_pengajuan,
      nama_barang: item.nama_barang,
      jumlah: item.jumlah_barang,
      status: item.status,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
