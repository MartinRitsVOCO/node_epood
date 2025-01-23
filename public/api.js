export async function getProductById(productId) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/id/${productId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(data);
        console.error(error);
    }
    return data;
}

export async function getProductsByCount(count = 10, offset = 0) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/count?count=${count}&offset=${offset}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(data);
        console.error(error);
    }
    return data;
}

export async function getProductsByCategory(category, count = 10, offset = 0, exclude = false) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/category/count?category=${category}&count=${count}&offset=${offset}&exclude=${exclude}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(data);
        console.error(error);
    }
    return data;
}

export function getCategoryList() {
    return fetch('http://localhost:3000/api/categories')
        .then(response => response.json())
        .then(data => {
            return data;
        });
}