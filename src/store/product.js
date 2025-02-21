import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:2200/products";

const useProductStore = create((set) => ({
    products: [],

    // fetching products
    fetchProducts: async () => {
        try {
            const response = await axios.get(API_URL);
            set({ products: response.data });
        } catch (error) {
            console.error(
                "Error fetching products:",
                error.response?.data?.message || error.message
            );
        }
    },
    // add product
    addProduct: (newProduct) => {
        set((state) => {
            const updatedProducts = [...state.products, newProduct];
            localStorage.setItem("products", JSON.stringify(updatedProducts)); // Persist
            return { products: updatedProducts };
        });
    },

    // edit product
    editProduct: async (id, updatedProduct) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
            set((state) => ({
                products: state.products.map((product) =>
                    product.id === id ? response.data : product
                ),
            }));
        } catch (error) {
            console.error("Error editing products", error);
        }
    },

    // remove a product
    removeProductFromList: async (id) => {
        try {
            set((state) => ({
                products: state.products.filter((p) => p.id !== id),
            }));
        } catch (error) {
            console.error("Error removing product", error);
        }
    },

    // Reduce stock when a product is sold
    reduceStock: async (soldItems) => {
        try {
            for (const soldItem of soldItems) {
                const id = soldItem._id;
                // Fetch product details by name to get the correct ID
                const response = await axios.get(`${API_URL}/${id}`);

                const productData = response.data; // Assuming you get an array and need the first item

                if (!productData || !productData._id) {
                    console.error(
                        `Product "${soldItem.productName}" not found or missing ID!`
                    );
                    continue; // Skip this product if there's an issue
                }

                const newStock = productData.stock - soldItem.quantity;
                if (newStock < 0) {
                    alert(`Not enough stock for ${soldItem.productName}!`);
                    continue;
                }

                console.log("Updating stock for product:", productData);
                console.log("Sold item:", soldItem.quantity);
                console.log("new stock:", newStock);

                // Correctly reference _id or id based on your backend data
                const updateUrl = await axios.patch(`${API_URL}/${id}`, {
                    stock: newStock,
                });
                console.log(updateUrl);

                // Update local state
                set((state) => ({
                    products: state.products.map((p) =>
                        p._id === productData._id ? { ...p, stock: newStock } : p
                    ),
                }));
            }
        } catch (error) {
            console.error("Error reducing stock:", error);
        }
    },

    // update product list after editing product
    updateProductInList: (updatedProduct) => {
        set((state) => ({
            products: state.products.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
            ),
        }));
    },
}));

export default useProductStore;
