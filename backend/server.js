import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import productRouter from "./routes/productRoutes.js";
import discountRouter from "./routes/discountRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/products", productRouter);
app.use("/api/brands", discountRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("API corriendo..."));
}

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () =>
  console.log(`Servidor ha iniciado en el puerto ${PORT} en modo ${NODE_ENV}`)
);
