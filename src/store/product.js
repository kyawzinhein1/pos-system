import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:2200/products";

const useProductStore = create((set) => ({
    products: [],

    // Fetching products
    fetchProducts: async () => {
        try {
            const response = await axios.get(API_URL);
            set({ products: response.data || [] }); // Ensure it's always an array
        } catch (error) {
            console.error("Error fetching products:", error);
            set({ products: [] }); // Avoid undefined state
        }
    },

    // Add product to the backend and update state
    addProduct: async (newProduct) => {
        try {
            const response = await axios.post(API_URL, newProduct);

            set((state) => {
                const updatedProducts = [...state.products, response.data];

                // Update local storage immediately within the set function
                localStorage.setItem("products", JSON.stringify(updatedProducts));

                return { products: updatedProducts };
            });

        } catch (error) {
            console.error("Error adding product:", error);
        }
    },


    // Edit an existing product
    editProduct: async (_id, updatedProduct) => {
        try {
            const response = await axios.put(`${API_URL}/${_id}`, updatedProduct);

            set((state) => ({
                products: state.products.map((product) =>
                    product._id === _id ? response.data : product
                ),
            }));

            return response.data; // Ensure we return the updated product
        } catch (error) {
            console.error("Error editing product:", error);
            return null; // Return null if there's an error
        }
    },

    // Remove product from backend and update state
    removeProductFromList: async (_id) => {
        try {
            await axios.delete(`${API_URL}/${_id}`);
            set((state) => ({
                products: state.products.filter((p) => p._id !== _id),
            }));
        } catch (error) {
            console.error("Error removing product:", error);
        }
    },

    // Reduce stock when a product is sold
    reduceStock: async (soldItems) => {
        try {
            set((state) => {
                let updatedProducts = [...state.products];

                soldItems.forEach((soldItem) => {
                    const productIndex = updatedProducts.findIndex(
                        (p) => p.id === soldItem.id
                    );
                    if (productIndex !== -1) {
                        const product = updatedProducts[productIndex];

                        const newStock = product.stock - soldItem.quantity;
                        if (newStock < 0) {
                            alert(`Not enough stock for ${soldItem.productName}!`);
                            return;
                        }

                        updatedProducts[productIndex] = { ...product, stock: newStock };

                        // Update backend stock
                        axios
                            .put(`${API_URL}/${soldItem.id}`, { stock: newStock })
                            .catch((error) => {
                                console.error("Error updating stock:", error);
                            });
                    }
                });

                return { products: updatedProducts };
            });
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
