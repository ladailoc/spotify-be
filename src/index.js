import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";

// Load các biến môi trường từ file .env
dotenv.config();

const app = express();
// Trong trường hợp sử dụng ES Modules, cần phải sử dụng path.resolve() để lấy đường dẫn tuyệt đối
// đến thư mục hiện tại (tương đương với __dirname trong CommonJS)
const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(express.json()); // Middleware để parse JSON request body
app.use(clerkMiddleware()); // add auth vào req obj
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true, // Tạo thư mục cha nếu không tồn tại
    limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn kích thước file upload (10MB)
  })
); // Middleware để xử lý file upload

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// error handler middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
