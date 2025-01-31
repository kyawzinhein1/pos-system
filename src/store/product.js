import { create } from "zustand";

const useProductStore = create((set) => ({
    products: [
        { name: "Earphone", category: "Accessories", price: 5000 },
        { name: "Powerbank", category: "Gadget", price: 10000 },
        { name: "Adapter", category: "Accessories", price: 20000 },
        { name: "Screen Guard", category: "Accessories", price: 4500 },
    ],

    addProduct: (product) =>
        set((state) => ({
            products: [...state.products, product],
        })),

    removeProductFromList: (name) =>
        set((state) => ({
            products: state.products.filter((p) => p.name !== name),
        })),
}));

export default useProductStore;
