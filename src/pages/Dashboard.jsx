import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BackBtn from "../components/BackBtn";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/transactions");
        setTransactions(response.data);

        // Calculate total revenue
        const revenue = response.data.reduce(
          (sum, transaction) => sum + transaction.total,
          0
        );
        setTotalRevenue(revenue);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchProducts();
    fetchTransactions();
  }, []);

  const lowStockProducts = products.filter((product) => product.stock <= 10);

  return (
    <section className="container mx-auto mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <BackBtn />
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl">{products.length}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Total Transactions</h2>
          <p className="text-2xl">{transactions.length}</p>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Low Stock Alerts</h2>
        {lowStockProducts.length === 0 ? (
          <p className="text-green-600">
            All products are sufficiently stocked.
          </p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-red-100">
              <tr>
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map((product) => (
                <tr key={product.id} className="border">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2 text-center text-red-600">
                    {product.stock}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
