import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:2200/products";

const useSaleStore = create((set) => ({
    selectedProducts: [],
    selectedProduct: "",
    quantity: "",
    date: "",
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

    setSelectedProduct: (product) => set({ selectedProduct: product }),
    setQuantity: (qty) => set({ quantity: qty }),
    setDate: (date) => set({ date }),

    addProductToCart: () =>
        set((state) => {
            if (!state.selectedProduct || !state.quantity) {
                alert("Please fill all fields.");
                return state;
            }

            const productToAdd = state.products.find(
                (p) => p.productName === state.selectedProduct
            );

            if (!productToAdd) {
                return state;
            }

            const newProduct = {
                ...productToAdd,
                quantity: state.quantity,
                date: state.date,
            };

            return {
                selectedProducts: [...state.selectedProducts, newProduct],
                selectedProduct: "",
                quantity: 0,
                date: "",
            };
        }),

    removeProduct: (name) =>
        set((state) => ({
            selectedProducts: state.selectedProducts.filter((p) => p.name !== name),
        })),

    clearSelectedProducts: () => set({ selectedProducts: [] }),
}));

export default useSaleStore;
