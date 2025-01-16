export default class Product {
    constructor(id, name, price, category, description, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category =  category;
        this.description = description;
        this.image = image;
        this.quantity = 0;
    }

    describe() {
        return `${this.name} is a ${this.category} product that costs ${this.price}€`;
    }

    static discountedPrice(price, discount) {
        return price * ((100 - discount) / 100);
    }
}