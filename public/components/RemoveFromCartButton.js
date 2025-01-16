import { updateNavbarCartCount } from "../router.js";

export default class RemoveFromCartButton {
    constructor(product, cart, callback, callbackScope) {
        this.product = product;
        this.cart = cart;
        this.callback = callback.bind(callbackScope);
        this.button = document.createElement("button");
    }

    render() {
        this.button.classList.add("remove-from-cart");

        this.button.addEventListener("click", this.onClick.bind(this));

        return this.button;
    }

    onClick() {
        this.cart.removeProduct(this.product.id);
        updateNavbarCartCount(this.cart);
        this.callback();
    }
}