const fs = require('fs').promises;

class ProductManager {
    constructor(Path) {
        this.Path = Path;
        this.products = [];
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.Path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async saveProducts(products) {
        // Guardar el arreglo de productos en el archivo
        await fs.writeFile(this.Path, JSON.stringify(products, null, 2), 'utf8');
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const newProductId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        product.id = newProductId;
        products.push(product);
        await this.saveProducts(products);
        return product;
    }

    async removeProduct(id) {
        // Leer productos existentes
        const products = await this.getProducts();
        // Filtrar productos para excluir el que tiene el ID especificado
        const filteredProducts = products.filter(product => product.id !== id);
        // Guardar en el archivo
        await this.saveProducts(filteredProducts);
        this.products = filteredProducts;
    }

    async getProductById(id) {
        // Leer productos existentes
        const products = await this.getProducts();
        // Buscar el producto por ID
        const product = products.find(p => p.id === id);
        return product;
    }
}
module.exports = ProductManager;