export async function getProductById(productId) {
    const response = await fetch(`http://localhost:3000/api/products/id/${productId}`);
    const data = response.json();
    return data;
}

export async function getProductsByCount(count = 10, offset = 0) {
    const response = await fetch(`http://localhost:3000/api/products/count?count=${count}&offset=${offset}`);
    const data = response.json();
    return data;
}

export async function getProductsByCategory(category, count = 10, offset = 0) {
    const response = await fetch(`http://localhost:3000/api/products/category/count?category=${category}&count=${count}&offset=${offset}`);
    const data = response.json();
    return data;
}

export function getCategoryList() {
    return fetch('http://localhost:3000/api/categories')
        .then(response => response.json())
        .then(data => {
            return data;
        });
}