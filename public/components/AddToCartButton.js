import { updateNavbarCartCount } from "../router.js";

export default class AddToCartButton {
    constructor(product, cart) {
        this.product = product;
        this.cart = cart;
        this.button = document.createElement("button");
    }

    render() {
        this.button.classList.add("add-to-cart");

        if (this.cart.products.some(entry => entry.id === this.product.id)) {
            this.button.classList.add("add-to-cart--true")

            const cartProduct = this.cart.products.find(entry => entry.id === this.product.id);
            this.button.textContent = `${cartProduct.quantity}`;
        }
        else {
            this.button.classList.add("add-to-cart--false")
        }

        this.button.addEventListener("click", this.onClick.bind(this));

        return this.button;
    }

    onClick() {
        if (this.button.classList.contains("add-to-cart--false")) {
            this.button.classList.remove("add-to-cart--false");
            this.button.classList.add("add-to-cart--true")
        }

        this.cart.addProduct(this.product);
        const cartProduct = this.cart.products.find(entry => entry.id === this.product.id);
        this.button.textContent = `${cartProduct.quantity}`;
        updateNavbarCartCount(this.cart);
    }
}