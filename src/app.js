import express from "express";
import ProductManager from "./ProductManager.js";
import fs from "fs";

const app = express();
const port = 8080;
const productManager = new ProductManager();

// Endpoint para obtener todos los productos con un límite opcional
app.get("/products", (req, res) => {
  fs.readFile("src/products.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("Error al leer el archivo de productos: ", err);
      return res.status(500).send("Error al leer el archivo de productos");
    }
    const products = JSON.parse(data);
    const limit = req.query.limit;
    if (limit) {
      res.send({ products: products.slice(0, limit) });
    } else {
      res.send({ products });
    }
  });
});

// Endpoint para obtener un producto por su ID
app.get("/products/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  fs.readFile("src/products.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("Error al leer el archivo de productos: ", err);
      return res.status(500).send("Error al leer el archivo de productos");
    }
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === productId);
    if (product) {
      res.send({ product });
    } else {
      res
        .status(404)
        .send({ error: `El ID ${productId} no se encuentra registrado` });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
