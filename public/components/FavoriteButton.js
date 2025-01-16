export default class FavoriteButton {
    constructor(product, customer) {
        this.product = product;
        this.customer = customer;
        this.button = document.createElement("button");
    }

    render() {
        this.button.classList.add("favorite-button");
        this.button.classList.add(`favorite-button--${this.customer.favorites.some(entry => entry === this.product.id) ? 'true' : 'false'}`);
        this.button.addEventListener("click", this.onClick.bind(this));

        return this.button;
    }

    onClick() {
        const favoriteIndex = this.customer.favorites.findIndex(entry => entry === this.product.id);
        if (favoriteIndex === -1) {
            this.button.classList.remove(`favorite-button--false`);
            this.customer.favorites.push(this.product.id);
            this.button.classList.add(`favorite-button--true`);
        } else {
            this.button.classList.remove(`favorite-button--true`);
            this.customer.favorites.splice(favoriteIndex, 1);
            this.button.classList.add(`favorite-button--false`);
        }
    }
}