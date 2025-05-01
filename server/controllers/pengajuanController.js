const Pengajuan = require("../models/Pengajuan");
const Inventaris = require("../models/Inventaris");

const buatPengajuan = async (req, res) => {
  try {
    const pengajuan = new Pengajuan(req.body);
    await pengajuan.save();
    res.status(201).json({ message: "Successfully created", pengajuan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create" });
  }
};

const getAllPengajuan = async (req, res) => {
  try {
    const list = await Pengajuan.find()
      .populate("user_id", "name email unit")
      .populate("kode_barang", "nama_barang")
      .sort({ tgl_pengajuan: -1 });

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

const updateStatusPengajuan = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Proses", "Diterima", "Ditolak"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const pengajuan = await Pengajuan.findById(id);
    if (!pengajuan) {
      return res
        .status(404)
        .json({ message: "Data pengajuan tidak ditemukan" });
    }

    if (pengajuan.status !== "Diterima" && status === "Diterima") {
      if (pengajuan.kode_barang) {
        const inventaris = await Inventaris.findById(pengajuan.kode_barang);
        if (!inventaris) {
          return res.status(404).json({ message: "Not Found" });
        }

        const jumlah = pengajuan.jumlah_barang || 1;

        if (pengajuan.jenis_pengajuan === "Peminjaman") {
          if (inventaris.jumlah < jumlah) {
            return res.status(400).json({ message: "Out of Stock" });
          }
          inventaris.jumlah -= jumlah;
        } else if (pengajuan.jenis_pengajuan === "Pengembalian") {
          inventaris.jumlah += jumlah;
        }

        inventaris.status = inventaris.jumlah > 0 ? "Tersedia" : "Dipinjam";

        await inventaris.save();
      }
    }

    pengajuan.status = status;
    await pengajuan.save();

    res
      .status(200)
      .json({ message: "Status pengajuan berhasil diperbarui", pengajuan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update" });
  }
};

const getPengembalianDanPerpanjangan = async (req, res) => {
  try {
    const data = await Pengajuan.find({
      jenis_pengajuan: { $in: ["Pengembalian", "Perpanjangan"] },
    })
      .populate("user_id", "name email unit")
      .populate("kode_barang", "nama_barang")
      .populate("id_peminjaman", "batas_kembali");

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

const getStatistikBulanan = async (req, res) => {
  try {
    const result = await Pengajuan.aggregate([
      {
        $match: {
          jenis_pengajuan: "Peminjaman",
          status: "Diterima",
        },
      },
      {
        $group: {
          _id: { $month: "$tgl_pengajuan" },
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const labels = [];
    const data = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    for (let i = 1; i <= 12; i++) {
      const found = result.find((r) => r._id === i);
      labels.push(monthNames[i - 1]);
      data.push(found ? found.total : 0);
    }

    res.json({ labels, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memuat grafik", error });
  }
};

module.exports = {
  buatPengajuan,
  getAllPengajuan,
  updateStatusPengajuan,
  getPengembalianDanPerpanjangan,
  getStatistikBulanan,
};
