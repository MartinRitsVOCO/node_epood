export default class BuyButton {
    constructor(cart, customer, productListElement, cartTotalCost) {
        this.cart = cart;
        this.costumer = customer;
        this.productListElement = productListElement;
        this.cartTotalCost = cartTotalCost;
        this.button = document.createElement("button");
    }

    render() {
        this.button.id = "product-list--header--buy-button";

        this.button.addEventListener("click", this.onClick.bind(this));

        return this.button;
    }

    click() {

        // Empty cart
        this.cart.clear();
        while (this.productListElement.childNodes[1]) {
            this.productListElement.removeChild(this.productListElement.childNodes[1]);
        }
        this.cartTotalCost.textContent = this.cart.calculateTotal() + "€";
    }

}