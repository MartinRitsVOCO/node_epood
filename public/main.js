// Import classes
import Product from "./class/Product.js";
import Cart from "./class/Cart.js";
import Customer from "./class/Customer.js";
import { getCategoryList, getProductById } from "./api.js";

// Import router
import { handleRouteChange, clickRouter, initRouter } from "./router.js";

// Initialize variables
const productList = []
const categoryList = await getCategoryList();
categoryList.sort((a, b) => a.category.localeCompare(b.category));
const cart = new Cart();
let customer = {};

// Initialize costumer
if (localStorage.getItem("customer")) {
    customer = new Customer(localStorage.getItem("customer"));
} else {
    customer = new Customer(crypto.randomUUID());
    localStorage.setItem("customer", customer.name);
}

// Add router events
document.querySelectorAll('.route').forEach(link => {link.addEventListener('click', clickRouter)});

function closeModal() {
    document.querySelector("#modal").classList.add("--hidden");
}

document.querySelector("#modal--close-button").addEventListener("click", closeModal);

// Initialize router
initRouter(productList, categoryList, cart, customer);

//Get favorite products if any
if ( localStorage.getItem("favorites") ) {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    favorites.forEach(favorite => {
        getProductById(favorite)
        .then(
            product => {
                product = new Product(product.id, product.title, product.price, product.category, product.description, product.image);
                productList.push(product);
                customer.favorites.push(product.id);
            }
        ).then(
            () => {
                handleRouteChange();
            }
        );
    });
} else {
    handleRouteChange();
}