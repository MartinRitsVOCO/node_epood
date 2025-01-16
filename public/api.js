import Product from "./class/Product";
import { productList } from "./main";

function getProductById(productId) {
    const product = productList.find(product => product.id === productId);
    if (product) {
        return product;
    } else {
        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                productList.push(
                    new Product(
                        data.id,
                        data.title,
                        data.price,
                        data.category,
                        data.description,
                        data.image
                    )
                );
            })
    }
}

function getCategoryList() {
    return fetch('http://localhost:3000/api/categories')
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

function getProductCount() {
    return fetch('http://localhost:3000/api/product-count')
        .then(response => response.text())
        .then(data => {
            return data;
        });
}