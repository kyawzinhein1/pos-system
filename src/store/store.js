import { create } from "zustand";

const useSaleStore = create((set) => ({
    selectedProducts: [],
    selectedProduct: "",
    quantity: "",
    date: "",
    products: [
        {
            name: "Earphone",
            category: "Accessories",
            price: 5000,
        },
        {
            name: "Powerbank",
            category: "Gadget",
            price: 10000,
        },
        {
            name: "Adapter",
            category: "Accessories",
            price: 20000,
        },
        {
            name: "Screen Guard",
            category: "Accessories",
            price: 4500,
        },
    ],

    setSelectedProduct: (product) => set({ selectedProduct: product }),
    setQuantity: (qty) => set({ quantity: qty }),
    setDate: (date) => set({ date }),

    addProductToCart: () =>
        set((state) => {
            if (!state.selectedProduct || !state.quantity || !state.date) {
                alert("Please fill all fields.");
                return state;
            }

            const productToAdd = state.products.find(
                (p) => p.name === state.selectedProduct
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
