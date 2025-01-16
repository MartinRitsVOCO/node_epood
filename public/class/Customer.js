import Order from "./Order.js";

export default class Customer {
    constructor(name) {
        this.name = name;
        this.orderHistory = [];
        this.favorites = [];
    }

    placeOrder(cart) {
        let order = new Order(cart);
        this.orderHistory.push(order);
    }

    printOrderHistory () {
        this.orderHistory.forEach(order => {
            console.log(`${order.orderDate} ${order.cart.calculateTotal()}`)
        })
    }
}