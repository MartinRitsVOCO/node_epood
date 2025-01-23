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

            let favoritesStorage = [];
            if (localStorage.getItem("favorites") !== null) {
                favoritesStorage = JSON.parse(localStorage.getItem("favorites"));
            }
            favoritesStorage.push(this.product.id);
            localStorage.setItem("favorites", JSON.stringify(favoritesStorage));
        } else {
            this.button.classList.remove(`favorite-button--true`);
            this.customer.favorites.splice(favoriteIndex, 1);
            this.button.classList.add(`favorite-button--false`);

            if (localStorage.getItem("favorites") !== null) {
                let favoritesStorage = JSON.parse(localStorage.getItem("favorites"));
                favoritesStorage.splice(favoritesStorage.findIndex(entry => entry === this.product.id), 1);
                localStorage.setItem("favorites", JSON.stringify(favoritesStorage));
            }
        }
    }
}