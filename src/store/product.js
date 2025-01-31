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

    // remove a product
    removeProductFromList: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            set((state) => ({
                products: state.products.filter((p) => p.id !== id),
            }));
        } catch (error) {
            console.error("Error removing product", error);
        }
    },
}));

export default useProductStore;
