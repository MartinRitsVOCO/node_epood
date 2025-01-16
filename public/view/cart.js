import CartEntry from "../components/CartEntry.js";

export default function cartView(cart, customer, rootPath) {
    const productList = cart.products;
    const productListElement = document.createElement("div");
    productListElement.id = "product-list";

    const cartSummary = document.createElement("div");
    cartSummary.id = "product-list--header";

    const cartTotalCost = document.createElement("p");
    cartTotalCost.id = "product-list--header--total-cost";
    cartTotalCost.textContent = cart.calculateTotal() + "€";

    cartSummary.appendChild(cartTotalCost);

    productListElement.appendChild(cartSummary);

    if (productList.length <= 0) {
        productListElement.textContent = "No Products in Cart"
    } else {
        productList.forEach(product => {
            const cartEntry = new CartEntry(cartTotalCost, rootPath, product, cart, customer);
            productListElement.appendChild(cartEntry.render());
        })
    }

    return productListElement;
}