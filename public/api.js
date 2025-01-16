export const getProductsData = async () => {
    try {
        const data = await fetch("./products.js");
        return await data.json();
    } catch(error) {
        console.error(error);
    }
};