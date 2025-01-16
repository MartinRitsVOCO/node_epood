import ProductEntry from "../components/ProductEntry.js";

export default function favoritesView(productList, cart, customer, rootPath) {
    const productListElement = document.createElement("div");
    productListElement.id = "product-list";

    if (productList.length <= 0) {
        productListElement.textContent = "No Products Available";
    } else {
        productList.forEach(product => {
            if (customer.favorites.some(entry => entry === product.id)){
                const productEntry = new ProductEntry(rootPath, product, cart, customer);
                productListElement.appendChild(productEntry.render());
            }
        })
    }

    if (productList.length > 0 && productListElement.childNodes.length <= 0) {
        productListElement.textContent = "No Favorites Added";
    }

    return productListElement;
}