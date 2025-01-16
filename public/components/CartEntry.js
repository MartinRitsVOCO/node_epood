import ProductEntry from "./ProductEntry.js";
import RemoveFromCartButton from "./RemoveFromCartButton.js";
import CartFields from "./CartFields.js";

export default class CartEntry extends ProductEntry {
    constructor(cartTotalCost, ...args) {
        super(...args);
        this.cartEntry = super.render();
        this.cartTotalCost = cartTotalCost;
    }

    render() {
        this.cartEntry.classList.add("cart-entry");

        const entryButtons = this.cartEntry.querySelector(".product-entry-buttons");

        entryButtons.querySelector(".add-to-cart").remove();

        const removeButton = new RemoveFromCartButton(this.product, this.cart, this.removeEntry, this);
        entryButtons.appendChild(removeButton.render());

        const cartFields = new CartFields(this.product, this.cart, this.updateCartTotalCost, this);
        entryButtons.appendChild(cartFields.render());

        return this.cartEntry;
    }

    updateCartTotalCost() {
        this.cartTotalCost.textContent = this.cart.calculateTotal() + "€";
    }

    removeEntry() {
        this.updateCartTotalCost();
        this.cartEntry.remove();
    }
}