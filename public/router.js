// Import views
import productListView from "./view/productList.js";
import cartView from "./view/cart.js";
import favoritesView from "./view/favorites.js";
import productDetailsView from "./view/productDetails.js";

// Initialize variables
const rootPath = "/";
let currentView = "";
let productList = [];
let categoryList = [];
let cart;
let customer;

// Update handleRouteChange to render views
function handleRouteChange() {
    const path = window.location.pathname;
    let view;
    let isModal = false;
    
    switch (path) {
        case rootPath + 'cart':
            view = cartView(cart, customer, rootPath);
            currentView = "cart";
        break;
        
        case rootPath + 'favorites':
            view = favoritesView(productList, cart, customer, rootPath);
            currentView = "favorites";
        break;
        
        default:
            if (path.match(rootPath + 'product/[0-9]+')) {
                const productId = path.split('/').pop();
                view = productDetailsView(productId, productList, cart, rootPath);
                isModal = true;
                currentView = "productDetails";
            } else {
                view = productListView(productList, categoryList, cart, customer, rootPath);
                currentView = "productList";
            }
    }
    
    if (isModal) {
        document.getElementById("modal-view").innerHTML = "";
        document.getElementById("modal-view").appendChild(view);
        document.getElementById("modal").classList.remove("--hidden");
    } else {
        document.getElementById('view-container').innerHTML = "";
        document.getElementById('view-container').appendChild(view);
    }
}

// Function for nav route elements
function clickRouter(event) {
    event.preventDefault();
    history.pushState(null, '', event.target.href);
    handleRouteChange();
}

// Initialize router
function initRouter(pList, cList, cartObject, customerObject) {
    productList = pList;
    categoryList = cList;
    cart = cartObject;
    customer = customerObject;

    updateNavbarCartCount(cart);
    window.addEventListener('popstate', handleRouteChange);
}

function updateNavbarCartCount (cart) {
    const navbarCartCount = document.querySelector("#main-nav--cart-amount");
    navbarCartCount.textContent = cart.totalItems;
}

export { handleRouteChange, clickRouter, initRouter, rootPath, currentView, updateNavbarCartCount };