import { Schema, model } from "mongoose";

const SachSchema = new Schema(
  {
    maSach: { type: String, required: true, unique: true },
    maNXB: { type: String, default: "" },
    tenSach: { type: String, default: "" },
    donGia: { type: String, require: true },
    soQuyen: { type: Number, default: 0 },
    namXuatBan: { type: Number, require: true },
    photo: { type: String, require: false },
    caption: { type: String, require: true },
    tacGia: { type: String, require: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    category: [{ type: Schema.Types.ObjectId, ref: "SachCategory" }],
    view: { type: Number, default: 0 },
    country: { type: String, default: "" },
    checked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Sach = model("Sach", SachSchema);
export default Sach;
