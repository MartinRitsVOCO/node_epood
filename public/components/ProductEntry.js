import { clickRouter } from "../router.js";
import AddToCartButton from "./AddToCartButton.js";
import FavoriteButton from "./FavoriteButton.js";

export default class ProductEntry {
    constructor(rootPath, product, cart, customer) {
        this.rootPath = rootPath;
        this.product = product;
        this.cart = cart;
        this.customer = customer;
        this.productEntry = document.createElement("section");
    }

    render() {
        this.productEntry.classList.add("product-entry");

        const productHeader = document.createElement("a");
        productHeader.href = `${this.rootPath}product/${this.product.id}`;
        productHeader.addEventListener("click", clickRouter);

        productHeader.appendChild(document.createElement("h3"));
        productHeader.firstChild.textContent = this.product.name;
        productHeader.appendChild(document.createElement("img"));
        productHeader.lastChild.src = this.product.image;

        this.productEntry.appendChild(productHeader);

        const productPrice = document.createElement("div");
        productPrice.classList.add("product-entry-price");

        let price = this.product.price;
        price = (Math.round(price * 100)/100).toFixed(2);
        productPrice.textContent = price + "€";

        this.productEntry.appendChild(productPrice);

        const productButtons = document.createElement("div");
        productButtons.classList.add("product-entry-buttons");

        const addToCart = new AddToCartButton(this.product, this.cart);
        const favoriteButton = new FavoriteButton(this.product, this.customer);

        productButtons.appendChild(addToCart.render());
        productButtons.appendChild(favoriteButton.render());

        this.productEntry.appendChild(productButtons);

        return this.productEntry;
    }
}