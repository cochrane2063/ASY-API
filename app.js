const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const base_url = '/api/v1';
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let products = [];

function productExists(name) {
    return products.some(product => product.name === name);
}

function createProduct(name, price, stock) {
    const newProduct = {
        name,
        price,
        stock
    };
    products.push(newProduct);
    return newProduct;
}

function updateProduct(name, price, stock) {
    let index = products.findIndex(product => product.name === name);
    if (index !== -1) {
        products[index].price = price !== undefined ? price : products[index].price;
        products[index].stock = stock !== undefined ? stock : products[index].stock;
        return products[index];
    }
    return null;
}

function deleteProduct(name) {
    products = products.filter(product => product.name !== name);
}

function getProduct(name) {
    return products.find(product => product.name === name);
}



app.post(base_url + '/product/create', (req, res)=>{

    const name = req.body.name;
    const price = req.body.price;
    const stock = req.body.stock;

    if(productExists(name)) {
        return res.status(409).json({code: 409, message: "Product with the same name already exists"});
    }
    const newProduct = createProduct(name, price, stock);
    res.status(201).json({code: 201, name: newProduct.name, message: "Product created"});
});

app.put(base_url + '/product/update', (req, res)=>{

    const name = req.body.name;
    const price = req.body.price ? req.body.price : undefined;
    const stock = req.body.stock ? req.body.stock : undefined;

    if(!productExists(name)) {
        return res.status(404).json({code: 404, message: "Product not found"});
    }
    const updatedProduct = updateProduct(name, price, stock);
    res.status(200).json({code: 200, name: updatedProduct.name, message: "Product updated"});
});

app.get(base_url + '/product/:name', (req, res)=>{

    const name = req.params.name;
    const product = getProduct(name);
    if(!product) {
        return res.status(404).json({code: 404, message: "Product not found"});
    }
    res.status(200).json({code: 200, product, message: "Product retrieved"});
});

app.get(base_url + '/products', (req, res)=>{
    res.status(200).json({code: 200, products, message: "Products retrieved"});
});

app.delete(base_url + '/product/:name', (req, res)=>{

    const name = req.params.name;
    const product = getProduct(name);
    if(!product) {
        return res.status(404).json({code: 404, message: "Product not found"});
    }
    deleteProduct(name);
    res.status(200).json({code: 200, name: product.name, message: "Product deleted"});
});

app.delete(base_url + '/products', (req, res)=>{
    products = [];
    res.status(200).json({code: 200, message: "All products deleted"});
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);