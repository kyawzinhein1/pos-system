import { useEffect, useState } from "react";
import useTransactionStore from "../store/transactions";
import BackBtn from "../components/BackBtn";

const Transactions = () => {
  const { transactions, fetchTransactions } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <section className="container mx-auto mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-8">Transactions</h1>
        <BackBtn />
      </div>
      <div className="max-h-[460px] overflow-y-auto border border-gray-300 rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="border py-2">No</th>
              <th className="border py-2">Transaction ID</th>
              <th className="border py-2">Products</th>
              <th className="border py-2">Total</th>
              <th className="border py-2">Date</th>
              <th className="border py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-red-600 py-4">
                  No transaction found
                </td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <tr key={transaction.id} className="border">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{transaction.id}</td>
                  <td className="px-4 py-2 text-center">
                    {transaction.products
                      .map((trxn) => `${trxn.name} (x${trxn.quantity})`)
                      .join(", ")}
                  </td>
                  <td className="pe-16 py-2 text-end">{transaction.total}</td>
                  <td className="px-4 py-2 text-center">{transaction.date}</td>
                  <td className="px-4 py-2 text-center">{transaction.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Transactions;
