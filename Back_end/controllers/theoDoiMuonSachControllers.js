import Sach from "../models/Sach";
import TheoDoiMuonSach from "../models/TheoDoiMuonSach";

export const createMuonSach = async (req, res) => {
  try {
    const { soLuongMuon, maDocGia } = req.body;
    console.log(maDocGia);
    const { maSach } = req.params;
    const sach = await Sach.findOne({ maSach: maSach });
    const existingMuonSach = await TheoDoiMuonSach.findOne({
      user: req.user._id,
      maSach: sach.maSach,
    });
    if (existingMuonSach) {
      return res.status(400).json({
        message: "Bạn đã mượn quyển sách này, cần chờ Admin duyệt để tiếp tục",
      });
    }
    if (soLuongMuon > sach.soQuyen) {
      return res.status(400).json({
        message: "Số lượng sách không đủ",
      });
    }

    const newMuonSach = new TheoDoiMuonSach({
      user: req.user._id,
      maDocGia: maDocGia,
      maSach: sach.maSach,
      sach: sach._id,
      // check:sach.check,
      soLuongMuon: soLuongMuon ? soLuongMuon : 1,
    });

    const createdMuonSach = await newMuonSach.save();

    return res.json(createdMuonSach);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getMuonSachByUser = async (req, res) => {
  try {
    const userId = req.user._id; // Lấy userId từ req.user
    const muonSachList = await TheoDoiMuonSach.find({ user: userId }).populate({
      path: "sach",
      select: "tenSach photo",
    });

    return res.json(muonSachList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteMuonSach = async (req, res) => {
  try {
    const { idMuonSach } = req.params;
    const muonSachList = await TheoDoiMuonSach.findByIdAndDelete({
      _id: idMuonSach,
    });

    if (!muonSachList) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy dữ liệu để xóa." });
    }

    return res.json({ message: "Xóa thành công." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllMuonSach = async (req, res) => {
  try {
    const muonSachList = await TheoDoiMuonSach.find({}).populate([
      {
        path: "sach",
        select: "tenSach photo",
      },
      {
        path: "user",
        select: "email",
      },
    ]);

    if (!muonSachList || muonSachList.length === 0) {
      return res.status(404).json({ message: "Không có dữ liệu" });
    }

    return res.json(muonSachList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const checkTheMuon = async (req, res) => {
  try {
    const { idMuonSach } = req.params;

    const muonSach = await TheoDoiMuonSach.findById(idMuonSach);
    const sach = await Sach.findById({ _id: muonSach.sach });
    const soQuyenCurr = sach.soQuyen;
    if (!muonSach) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin mượn sách" });
    }

    muonSach.check = !muonSach.check;
    if (soQuyenCurr < muonSach.soLuongMuon) {
      return res.status(404).json({ message: "Số lượng hiện tại không đủ" });
    } else {
      sach.soQuyen = soQuyenCurr - muonSach.soLuongMuon;
      await sach.save();
    }

    const updatedMuonSach = await muonSach.save();

    return res.json(updatedMuonSach);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
