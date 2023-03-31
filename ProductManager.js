import fs from "fs";

class ProductManager {
  constructor() {
    this.products = [];
    this.lastId = 0;
    this.filename = "products.txt"; // Nombre del archivo
    // Si el archivo existe, lo cargamos en memoria
    if (fs.existsSync(this.filename)) {
      const data = fs.readFileSync(this.filename, "utf-8");
      this.products = JSON.parse(data);
      // Asignamos el último id a partir de los productos cargados
      this.lastId = Math.max(...this.products.map((product) => product.id));
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.error(`El producto con el código "${code}" ya existe.`);
      return;
    }

    const product = {
      id: ++this.lastId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);

    fs.writeFileSync(this.filename, JSON.stringify(this.products, null, 2));

    console.log(`El producto id ${product.id} fue añadido correctamente.`);
  }

  removeProductById(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      console.error("Producto no encontrado");
      return;
    }
    this.products.splice(index, 1);
    console.log(`El producto con el id ${id} ha sido eliminado.`);
  }

  updateProductById(id, newData) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      console.error("Producto no encontrado");
      return;
    }
    const product = this.products[index];
    const updatedProduct = Object.assign({}, product, newData);
    this.products[index] = updatedProduct;
    console.log(`El producto con el id ${id} ha sido actualizado.`);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.error("Producto no encontrado");
    }
    return product;
  }
}

const productManager = new ProductManager();

productManager.addProduct(
  "Producto de prueba 1",
  "Este es un producto de prueba",
  200,
  "ruta/de/imagen",
  "ABC1",
  25
);

productManager.addProduct(
  "Producto de prueba 2",
  "Este es un producto de prueba",
  350,
  "ruta/de/imagen",
  "ABC2",
  10
);

productManager.addProduct(
  "Producto de prueba 3",
  "Este es un producto de prueba",
  400,
  "ruta/de/imagen",
  "ABC3",
  4
);

const products = productManager.getProducts();
console.log(products);

const productById = productManager.getProductById(1);
console.log(productById);

const productByIdNotFound = productManager.getProductById(3);
console.log(productByIdNotFound);

productManager.removeProductById(3);

productManager.updateProductById(1, { price: 250, stock: 20 });
