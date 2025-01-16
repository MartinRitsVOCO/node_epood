// Import classes
import Product from "./class/Product.js";
import Cart from "./class/Cart.js";
import Customer from "./class/Customer.js";

// Import router
import { handleRouteChange, clickRouter, initRouter } from "./router.js";

// Initialize variables
const productList = []
const categoryList = []
const cart = new Cart();
const customer = new Customer("John Doe");

// Add router events
document.querySelectorAll('.route').forEach(link => {link.addEventListener('click', clickRouter)});

function closeModal() {
    document.querySelector("#modal").classList.add("--hidden");
}

document.querySelector("#modal--close-button").addEventListener("click", closeModal);

// API call for product information
fetch('http://localhost:3000/api/products')
            .then(res=>res.json())
            .then(json=> {
                json.forEach(item => {
                    productList.push(
                        new Product(
                            item.id,
                            item.title,
                            item.price,
                            item.category,
                            item.description,
                            item.image
                        )
                    )

                    if (!categoryList.includes(item.category)) {
                        categoryList.push(item.category);
                    }
                })
                categoryList.sort((a, b) => a.localeCompare(b));
                initRouter(productList, categoryList, cart, customer);
                handleRouteChange();
            })