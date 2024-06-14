import uploadAvatar from "../middleware/uploadAvatarMiddleware";
import DocGia from "../models/DocGia";
import NhanVien from "../models/NhanVien";
import User from "../models/User";
import fileRemove from "../utils/fileRemove";

export const registerUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      hoTenNV,
      chucVu,
      diaChi,
      soDienThoai,
      hoLot,
      ten,
      ngaySinh,
      phai,
      role,
    } = req.body;

    // Kiểm tra xem email đã được sử dụng chưa
    let user = await User.findOne({ email });
    let userInfo = null;

    if (user) {
      throw new Error("Email đã được đăng ký");
    }

    if (role === "nhanvien") {
      const countNV = await NhanVien.countDocuments();

      const MSNV = "NV" + (countNV + 1);
      const nhanVien = new NhanVien({
        MSNV: MSNV,
        hoTenNV,
        chucVu,
        diaChi,
        soDienThoai,
      });
      await nhanVien.save();
      userInfo = {
        _id: nhanVien._id,
        hoTenNV: nhanVien.hoTenNV,
        chucVu: nhanVien.chucVu,
      };
    } else if (role === "docgia") {
      const countDG = await DocGia.countDocuments();

      const maDocGia = "DG" + (countDG + 1);
      const docGia = new DocGia({
        maDocGia: maDocGia,
        hoLot,
        ten,
        ngaySinh,
        diaChi,
        soDienThoai,
        phai,
      });
      await docGia.save();
      userInfo = {
        _id: docGia._id,
        hoLot: docGia.hoLot,
        ten: docGia.ten,
      };
    } else {
      throw new Error("Vai trò không hợp lệ");
    }

    // Tạo tài khoản người dùng
    user = new User({
      email,
      password,
      [role]: userInfo._id,
    });

    await user.save();
    if (user.nhanvien) {
      userInfo = await NhanVien.findById(user.nhanvien);
    } else if (user.docgia) {
      userInfo = await DocGia.findById(user.docgia);
    }
    return res.status(201).json({
      _id: user._id,
      email: user.email,
      token: await user.generateJWT(),
      userInfo,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("Khong tim thay email");
    }

    let userInfo = null;
    if (user.nhanvien) {
      userInfo = await NhanVien.findById(user.nhanvien);
    } else if (user.docgia) {
      userInfo = await DocGia.findById(user.docgia);
    }

    if (await user.comparePassword(password)) {
      return res.status(201).json({
        _id: user._id,
        email: user.email,
        userInfo,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Email hoac mat khau sai");
    }
  } catch (error) {
    next(error);
  }
};

export const loginGGUser = async (req, res, next) => {
  try {
    const { email, password, hoLot, ten, ngaySinh, diaChi, soDienThoai, phai } =
      req.body;
    let user = await User.findOne({ email });
    let userInfo = null;

    if (user) {
      if (user.docgia) {
        userInfo = await DocGia.findById(user.docgia);
      }
      // throw new Error("Email đã được đăng ký");
      return res.status(201).json({
        _id: user._id,
        email: user.email,
        token: await user.generateJWT(),
        userInfo,
      });
    }
    const countDG = await DocGia.countDocuments();
    const maDocGia = "DG" + (countDG + 1);
    const docGia = new DocGia({
      maDocGia: maDocGia,
      hoLot,
      ten,
      ngaySinh,
      diaChi,
      soDienThoai,
      phai,
    });
    await docGia.save();
    userInfo = {
      _id: docGia._id,
      maDocGia: maDocGia,
      hoLot: docGia.hoLot,
      ten: docGia.ten,
    };
    user = new User({
      email,
      password,
      docgia: userInfo._id,
    });
    await user.save();

    return res.status(201).json({
      _id: user._id,
      email: user.email,
      token: await user.generateJWT(),
      userInfo,
    });
  } catch (error) {
    next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    let userInfo = null;
    if (user.nhanvien != null) {
      userInfo = await NhanVien.findById(user.nhanvien);
    } else if (user.docgia != null) {
      userInfo = await DocGia.findById(user.docgia);
    } else {
      throw new Error("Vai trò không hợp lệ");
    }
    const userData = userInfo._doc;
    return res.status(201).json({
      _id: user._id,
      email: user.email,
      ...userData,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    const {
      email,
      hoTenNV,
      chucVu,
      diaChi,
      soDienThoai,
      hoLot,
      ten,
      ngaySinh,
      phai,
    } = req.body;

    let userInfo = null;

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    await User.findByIdAndUpdate(user._id, { email }, { new: true });

    if (user.nhanvien != null) {
      await NhanVien.findByIdAndUpdate(
        user.nhanvien,
        { hoTenNV, chucVu, diaChi, soDienThoai },
        { new: true }
      );
      userInfo = await NhanVien.findById(user.nhanvien);
    } else if (user.docgia != null) {
      await DocGia.findByIdAndUpdate(
        user.docgia,
        { hoLot, ten, ngaySinh, diaChi, soDienThoai, phai },
        { new: true }
      );
      userInfo = await DocGia.findById(user.docgia);
    } else {
      throw new Error("Vai trò không hợp lệ");
    }

    return res.status(200).json({
      _id: user._id,
      email: email,
      token: await user.generateJWT(),
      userInfo,
    });
  } catch (error) {
    next(error);
  }
};
export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    // So sánh mật khẩu cũ
    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      throw new Error("Mật khẩu cũ không đúng");
    }

    // Đặt mật khẩu mới
    user.password = newPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Mật khẩu đã được thay đổi thành công" });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
      .sort({ docgia: 1 })
      .populate([
        {
          path: "nhanvien",
          select: "chucVu",
        },
      ]);
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = await req.params.userId;

    await User.deleteOne({ _id: userId });

    res.send({
      message: "Taì khoản này đã được xóa !",
    });
  } catch (error) {
    next(error);
  }
};
