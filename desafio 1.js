class ProductManager {
  constructor() {
    this.products = [];
    this.lastId = 0;
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

    console.log(`El producto id ${product.id} fue añadido correctamente.`);
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
