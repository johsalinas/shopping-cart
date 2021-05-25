import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import productRouter from "./routes/productRoutes.js";
import discountRouter from "./routes/discountRoutes.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/products", productRouter);
app.use("/api/brands", discountRouter);

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.resolve(path.join(__dirname, "..", "/frontend/build")))
  );

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(path.join(__dirname, "..", "/frontend/build/index.html"))
    );
  });
}

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () =>
  console.log(`Servidor ha iniciado en el puerto ${PORT} en modo ${NODE_ENV}`)
);
