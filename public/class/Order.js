export default class Order {
    constructor(cart) {
        this.orderDate = new Date();
        this.cart = cart;
    }

    printOrder() {
        return `Order was made on: ${this.orderDate}, order total is ${this.cart.calculateTotal()}, order content is: ${this.cart.products.forEach(product => {
            product.describe()
        })}`
    }
}