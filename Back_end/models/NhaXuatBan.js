import { Schema, model } from "mongoose";

const NhaXuatBanSchema = new Schema(
  {
    maNXB: { type: String, required: true, unique: true },
    tenNXB: { type: String, required: true },
    diaChi: { type: String },
  },
  {
    timestamps: true,
  }
);

const NhaXuatBan = model("NhaXuatBan", NhaXuatBanSchema);
export default NhaXuatBan;
