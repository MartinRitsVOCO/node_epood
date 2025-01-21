// Import classes
import Product from "./class/Product.js";
import Cart from "./class/Cart.js";
import Customer from "./class/Customer.js";
import { getCategoryList } from "./api.js";

// Import router
import { handleRouteChange, clickRouter, initRouter } from "./router.js";

// Initialize variables
const productList = []
const categoryList = await getCategoryList();
console.log(categoryList);
categoryList.sort((a, b) => a.category.localeCompare(b.category));
const cart = new Cart();
const customer = new Customer("John Doe");

// Add router events
document.querySelectorAll('.route').forEach(link => {link.addEventListener('click', clickRouter)});

function closeModal() {
    document.querySelector("#modal").classList.add("--hidden");
}

document.querySelector("#modal--close-button").addEventListener("click", closeModal);

// Initialize router
initRouter(productList, categoryList, cart, customer);
handleRouteChange();