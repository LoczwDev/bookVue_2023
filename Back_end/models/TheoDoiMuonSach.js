import { Schema, model } from "mongoose";

const TheoDoiMuonSachSchema = new Schema(
  {
    maDocGia: { type: String, required: true }, 
    maSach: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    sach: { type: Schema.Types.ObjectId, ref: "Sach" },
    ngayMuon: { type: Date, required: true, default: Date.now },
    ngayTra: {
      type: Date,
      default: () => Date.now() + 90 * 24 * 60 * 60 * 1000,
    },
    soLuongMuon: { type: Number, default: 1 },
    check: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const TheoDoiMuonSach = model("TheoDoiMuonSach", TheoDoiMuonSachSchema);
export default TheoDoiMuonSach;
