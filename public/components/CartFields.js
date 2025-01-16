export default class CartFields {
    constructor(product, cart, callback, callbackScope) {
        this.product = product;
        this.cart = cart;
        this.callback = callback.bind(callbackScope);
        this.button = document.createElement("button");
        this.container = document.createElement("div");
        this.sumField = document.createElement("div");
        this.amountField = document.createElement("input");
        this.cartProduct = this.cart.products.find(entry => entry.id === this.product.id);
    }

    render() {
        this.container.classList.add("cart-entry-fields");

        this.sumField.classList.add("cart-entry-fields-sum");
        
        let sum = this.cartProduct.quantity * this.cartProduct.price;
        sum = (Math.round(sum * 100)/100).toFixed(2);
        this.sumField.textContent = sum + "€";

        this.container.appendChild(this.sumField);

        this.amountField.type = "number";
        this.amountField.max = 999;
        this.amountField.min = 1;
        this.amountField.step = 1;
        this.amountField.value = this.cartProduct.quantity;
        this.amountField.classList.add("cart-entry-fields-amounts");

        this.amountField.addEventListener("change", this.onAmountChange.bind(this));

        this.container.appendChild(this.amountField);

        return this.container;
    }

    onAmountChange() {
        if (this.amountField.value < 1 || this.amountField.value > 999) {
            this.amountField.value = this.cartProduct.quantity;
            return;
        }
        
        this.cartProduct.quantity = this.amountField.value;

        let sum = this.cartProduct.quantity * this.cartProduct.price;
        sum = (Math.round(sum * 100)/100).toFixed(2);
        this.sumField.textContent = sum + "€";
        this.callback()
    }
}