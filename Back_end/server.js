import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errHanlder, invalidPathHandler } from "./middleware/erroHanlder.js";
import cors from "cors";

// Router
import userRouter from "./router/userRouter.js";
import sachRouter from "./router/sachRouter.js";
import sachCategoryRouter from "./router/sachCategoryRouter.js";
import theoDoiMuonSachRouter from "./router/theoDoiMuonSachRouter.js";
import nhaXuatBanRouter from "./router/nhaXuatBanRouter.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Da ket noi");
});

app.use("/api/users", userRouter);
app.use("/api/sach", sachRouter);
app.use("/api/sachCategory", sachCategoryRouter);
app.use("/api/muonSach", theoDoiMuonSachRouter);
app.use("/api/nhaXuatBan", nhaXuatBanRouter);


app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errHanlder);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Chạy trên cổng ${PORT}`));
