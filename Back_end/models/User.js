import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, require: true },
    password: { type: String, require: true },
    nhanvien: { type: Schema.Types.ObjectId, ref: "NhanVien" },
    docgia: { type: Schema.Types.ObjectId, ref: "DocGia" },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
    return next;
  }
  return next;
});

UserSchema.methods.generateJWT = async function () {
  return await sign({ id: this._id }, process.env.JWT_TOKEN, {
    expiresIn: "30d",
  });
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return compare(enteredPassword, this.password);
};

const User = model("User", UserSchema);
export default User;
