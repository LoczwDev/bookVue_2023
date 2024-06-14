import NhaXuatBan from "../models/NhaXuatban";

export const createNhaXuatBan = async (req, res) => {
  try {
    const countNXB = await NhaXuatBan.countDocuments();

    const maNXB = "NXB" + (countNXB + 1);
    const { tenNXB, diaChi } = req.body;
    const nhaXuatBanMoi = new NhaXuatBan({
      maNXB: maNXB,
      tenNXB,
      diaChi,
    });

    const nhaXuatBan = await nhaXuatBanMoi.save();

    res.status(201).json(nhaXuatBan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllNhaXuatBan = async (req, res) => {
  try {
    let query = {};

    if (req.query.searchNXB) {
      query.tenNXB = { $regex: req.query.searchNXB, $options: "i" };
    }
    const nhaXuatBanList = await NhaXuatBan.find(query);
    res.json(nhaXuatBanList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy chi tiết một nhà xuất bản
export const getNhaXuatBanDetails = async (req, res) => {
  try {
    const { idNXB } = req.params;
    const nhaXuatBan = await NhaXuatBan.findById({ _id: idNXB });
    if (!nhaXuatBan) {
      return res.status(404).json({ message: "Không tìm thấy nhà xuất bản" });
    }
    res.json(nhaXuatBan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa một nhà xuất bản
export const deleteNhaXuatBan = async (req, res) => {
  try {
    const { idNXB } = req.params;
    const deletedNhaXuatBan = await NhaXuatBan.findByIdAndDelete({
      _id: idNXB,
    });
    if (!deletedNhaXuatBan) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy nhà xuất bản để xóa" });
    }
    res.json({ message: "Xóa nhà xuất bản thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin của một nhà xuất bản
export const updateNhaXuatBan = async (req, res) => {
  try {
    const { idNXB } = req.params;
    const { tenNXB, diaChi } = req.body;
    const updatedNhaXuatBan = await NhaXuatBan.findByIdAndUpdate(
      { _id: idNXB },
      { tenNXB, diaChi },
      { new: true }
    );
    if (!updatedNhaXuatBan) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy nhà xuất bản để cập nhật" });
    }
    res.json(updatedNhaXuatBan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
