import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";

import products from "./data/products.js";

dotenv.config();

const app = express();

// connectDB();

// app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API corriendo..."));

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id * 1);

  res.json(product);
});

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () =>
  console.log(`Servidor ha iniciado en el puerto ${PORT} en modo ${NODE_ENV}`)
);
