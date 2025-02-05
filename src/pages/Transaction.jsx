import { useEffect } from "react";
import useTransactionStore from "../store/transactions";

const Transactions = () => {
  const { transactions, fetchTransactions } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <section className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Transaction ID</th>
            <th className="border px-4 py-2">Products</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No transaction found
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr key={transaction.id} className="border">
                <td className="px-4 py-2 text-center">{}</td>
                <td className="px-4 py-2 text-center">{transaction.id}</td>
                <td className="px-4 py-2 text-center">
                  {transaction.products
                    .map((trxn) => `${trxn.name} (x${trxn.quantity})`)
                    .join(", ")}
                </td>
                <td className="px-4 py-2 text-center">${transaction.total}</td>
                <td className="px-4 py-2 text-center">{transaction.date}</td>
                <td className="px-4 py-2 text-center">{transaction.time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Transactions;
