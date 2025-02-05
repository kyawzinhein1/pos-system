import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/transactions";

const useTransactionStore = create((set) => ({
    transactions: [],

      // fetch transaction
      fetchTransactions: async () => {
        try {
          const response = await axios.get(API_URL);
          set({ transactions: response.data });
        } catch (error) {
          console.error("Error fetching transactions", error);
        }
      },

    // Store transaction history
    saveTransaction: async (transaction) => {
      try {
        const response = await axios.post(API_URL, transaction);
        set((state) => ({
          transactions: [...state.transactions, response.data],
        }));
      } catch (error) {
        console.error("Error saving transaction:", error);
      }
  },
}));

export default useTransactionStore;
