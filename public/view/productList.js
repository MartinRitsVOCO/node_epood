import ProductEntry from "../components/ProductEntry.js";

export default function productListView(productList, categoryList, cart, customer, rootPath) {
    const productListElement = document.createElement("div");
    productListElement.id = "product-list";

    const listHeader = document.createElement("div");
    listHeader.id = "product-list--header";

    const categoryPicker = document.createElement("select");
    categoryPicker.id = "product-list--header--category-picker";
    
    const allCategories = document.createElement("option");
    allCategories.text = "All"
    allCategories.value = "All";

    categoryPicker.add(allCategories);
    categoryPicker.selectedIndex = 0;

    if (categoryList.length <=0) {
        categoryPicker.disabled = true;
    } else {
        categoryList.forEach(category => {
            const categoryItem = document.createElement("option");
            categoryItem.text = category;
            categoryItem.value = category;
            categoryPicker.add(categoryItem);
        })
    }

    categoryPicker.addEventListener("change", (event) => {
        while (productListElement.childNodes[1]) {
            productListElement.removeChild(productListElement.childNodes[1]);
        }

        if (productList.length <= 0) {
            productListElement.textContent = "No Products Available"
        } else {
            productList.forEach(product => {
                if (product.category === event.target.value || event.target.value === "All") {
                    const productEntry = new ProductEntry(rootPath, product, cart, customer);
                    productListElement.appendChild(productEntry.render());
                }
            })
        }
    })

    listHeader.appendChild(categoryPicker);

    productListElement.appendChild(listHeader);

    if (productList.length <= 0) {
        productListElement.textContent = "No Products Available"
    } else {
        productList.forEach(product => {
            const productEntry = new ProductEntry(rootPath, product, cart, customer);
            productListElement.appendChild(productEntry.render());
        })
    }

    return productListElement;
}