import ProductEntry from "../components/ProductEntry.js";
import { getProductsByCategory, getProductsByCount, getProductById } from "../api.js";
import Product from "../class/Product.js";

export default function productListView(productList, categoryList, cart, customer, rootPath, page = 1) {
    const productListElement = document.createElement("div");
    productListElement.id = "product-list";

    const listHeader = document.createElement("div");
    listHeader.id = "product-list--header";

    const listHeaderRight = document.createElement("div");
    listHeaderRight.id = "product-list--header--right";

    const listHeaderLeft = document.createElement("div");
    listHeaderLeft.id = "product-list--header--left";

    const categoryPicker = document.createElement("select");
    categoryPicker.id = "product-list--header--category-picker";
    
    const placeholder = document.createElement("option");
    placeholder.text = "Select a category";
    placeholder.value = "placeholder";
    placeholder.disabled = true;
    placeholder.hidden = true;

    const allCategories = document.createElement("option");
    allCategories.text = "All";
    allCategories.value = "All";

    categoryPicker.add(placeholder);
    categoryPicker.add(allCategories);
    categoryPicker.selectedIndex = 0;

    if (categoryList.length <=0) {
        categoryPicker.disabled = true;
    } else {
        categoryList.forEach(category => {
            const categoryItem = document.createElement("option");
            categoryItem.text = category.category;
            categoryItem.value = category.category;
            categoryPicker.add(categoryItem);
        })
    }

    categoryPicker.addEventListener("change", async (event) => {
        while (productListElement.childNodes[1]) {
            productListElement.removeChild(productListElement.childNodes[1]);
        }

        if (event.target.value === "All") {
            if (productList.length <= 0) {
                const newProducts = await getProductsByCount(4);
                newProducts.forEach(product => {
                    productList.push(
                        new Product(
                            product.id,
                            product.title,
                            product.price,
                            product.category,
                            product.description,
                            product.image
                        )
                    )
                    const productEntry = new ProductEntry(rootPath, productList.at(-1), cart, customer);
                    productListElement.appendChild(productEntry.render());
                })

            } else {
                for (let i = 0; i < 4; i++) {
                    let product = productList.find(entry => entry.id === 1 + i + (page - 1) * 4);
                    if (!product) {
                        const newProduct = await getProductById(i + 1 + (page - 1) * 4);
                        product = new Product(
                            newProduct.id,
                            newProduct.title,
                            newProduct.price,
                            newProduct.category,
                            newProduct.description,
                            newProduct.image
                        )
                        productList.push(product);
                    }
                    const productEntry = new ProductEntry(rootPath, product, cart, customer);
                    productListElement.appendChild(productEntry.render());
                }
            }
        } else {
            if (productList.filter(entry => entry.category === event.target.value).length <= 0) {
                const newProducts = await getProductsByCategory(event.target.value, 4);
                newProducts.forEach(product => {
                    productList.push(
                        new Product(
                            product.id,
                            product.title,
                            product.price,
                            product.category,
                            product.description,
                            product.image
                        )
                    )
                    const productEntry = new ProductEntry(rootPath, productList.at(-1), cart, customer);
                    productListElement.appendChild(productEntry.render());
                })
            }
        }
    })

    listHeader.appendChild(listHeaderLeft);
    listHeader.appendChild(categoryPicker);
    listHeader.appendChild(listHeaderRight);
    productListElement.appendChild(listHeader);

    return productListElement;
}