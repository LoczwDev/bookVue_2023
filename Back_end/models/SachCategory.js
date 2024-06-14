import { Schema, model } from "mongoose";

const SachCategorySchema = new Schema(
  {
    title: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const SachCategory = model("SachCategory", SachCategorySchema);
export default SachCategory;
