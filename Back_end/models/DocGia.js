import { Schema, model } from "mongoose";

const DocGiaSchema = new Schema(
  {
    maDocGia: { type: String, required: true, unique: true },
    hoLot: { type: String, require: true },
    ten: { type: String, require: true },
    ngaySinh: { type: Date, default: "" },
    soDienThoai: { type: String, default: "" },
    diaChi: { type: String, default: "" },
    phai: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const DocGia = model("DocGia", DocGiaSchema);
export default DocGia;
