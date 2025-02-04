import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/products";

const useProductStore = create((set) => ({
    products: [],

    // fetching products
    fetchProducts: async () => {
        try {
            const response = await axios.get(API_URL);
            set({ products: response.data });
        } catch (error) {
            console.error("Error fetching products", error);
        }
    },
    // add product
    addProduct: async (newProduct) => {
        try {
            const response = await axios.post(API_URL, newProduct);
            set((state) => ({
                products: [...state.products, response.data],
            }));
        } catch (error) {
            console.error("Error adding products", error);
        }
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
    reduceStock: async (soldProducts) => {
        try {
            for (const soldItem of soldProducts) {
                // Fetch product details
                const response = await axios.get(`${API_URL}?name=${soldItem.name}`);
                const productData = response.data[0];

                if (!productData) {
                    console.error(`Product ${soldItem.name} not found!`);
                    continue;
                }

                // Calculate new stock level
                const newStock = productData.stock - soldItem.quantity;
                if (newStock < 0) {
                    alert(`Not enough stock for ${soldItem.name}!`);
                    continue;
                }

                // Update stock in JSON Server
                await axios.patch(`${API_URL}/${productData.id}`, { stock: newStock });

                // Update state in Zustand
                set((state) => ({
                    products: state.products.map((p) =>
                        p.id === productData.id ? { ...p, stock: newStock } : p
                    ),
                }));
            }
        } catch (error) {
            console.error("Error reducing stock:", error);
        }
    },
}));

export default useProductStore;
