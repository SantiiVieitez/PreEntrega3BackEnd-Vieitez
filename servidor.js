const express = require('express');
const ProductManager = require('./preentrega2.js');

const app = express();
const port = 3000;

const productManager = new ProductManager('products.json');

// Endpoint para obtener todos los productos con límite opcional
app.get('/products', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  productManager.getProducts().then((products) => {
    if (limit !== undefined) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  });
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  productManager.getProductById(productId).then((product) => {
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});