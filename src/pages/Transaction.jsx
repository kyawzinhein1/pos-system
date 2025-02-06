import { useEffect, useState } from "react";
import useTransactionStore from "../store/transactions";
import BackBtn from "../components/BackBtn";
import { Edit2Icon } from "lucide-react";
import TransactionDetail from "../components/TransactionDetail";
import * as XLSX from "xlsx";

const Transactions = () => {
  const { transactions, fetchTransactions } = useTransactionStore();

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDetailShow = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetail(true);
  };

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export to Excel function with styling
  const exportToExcel = () => {
    if (transactions.length === 0) {
      alert("No transactions to export.");
      return;
    }

    const ws = XLSX.utils.aoa_to_sheet([
      ["Transactions List"], // Title row
      [], // Empty row for spacing
      ["No", "Transaction ID", "Products", "Total", "Date", "Time"], // Table headers
      ...transactions.map((transaction, index) => [
        index + 1,
        transaction.id,
        transaction.products
          .map((trxn) => `${trxn.name} (x${trxn.quantity})`)
          .join(", "),
        transaction.total,
        transaction.date,
        transaction.time,
      ]),
    ]);

    // Merge the title row and apply styling
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];

    // Apply styles to title and headers
    const titleCell = ws["A1"];
    if (titleCell)
      titleCell.s = {
        font: { bold: true, sz: 14 },
        alignment: { horizontal: "center" },
      };

    const headerRange = ["A3", "B3", "C3", "D3", "E3", "F3"];
    headerRange.forEach((cell) => {
      if (ws[cell]) {
        ws[cell].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "4F81BD" } }, // Blue background
          alignment: { horizontal: "center" },
        };
      }
    });

    // Auto-adjust column widths
    ws["!cols"] = [
      { wch: 5 }, // No
      { wch: 15 }, // Transaction ID
      { wch: 40 }, // Products
      { wch: 12 }, // Total
      { wch: 15 }, // Date
      { wch: 10 }, // Time
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");

    XLSX.writeFile(wb, "transactions.xlsx");
  };

  return (
    <section className="container mx-auto mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-8">Transactions</h1>
        <input
          type="text"
          placeholder="Search by Transaction ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <BackBtn />
      </div>

      {/* table section */}
      <div className="max-h-[450px] overflow-y-auto rounded-lg">
        <table className="w-full border-collapse overflow-y-hidden">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="border py-2">No</th>
              <th className="border py-2">Transaction ID</th>
              <th className="border py-2">Products</th>
              <th className="border py-2">Total</th>
              <th className="border py-2">Date</th>
              <th className="border py-2">Time</th>
              <th className="border py-2">Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-red-600 py-4">
                  No transaction found
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction, index) => (
                <tr key={transaction.id} className="border">
                  <td className="px-2 py-2 text-center">{index + 1}</td>
                  <td className="py-2 text-center">{transaction.id}</td>
                  <td className="py-2 text-center">
                    {transaction.products
                      .map((trxn) => `${trxn.name} (x${trxn.quantity})`)
                      .join(", ")}
                  </td>
                  <td className="pe-10 py-2 text-end">{transaction.total}</td>
                  <td className="px-4 py-2 text-center">{transaction.date}</td>
                  <td className="px-4 py-2 text-center">{transaction.time}</td>
                  <td className="px-2 py-2 text-center">
                    <button
                      className="bg-yellow-500 p-2 rounded-full text-white hover:bg-yellow-600 mr-2 transition-colors"
                      onClick={() => {
                        handleDetailShow(transaction);
                      }}
                    >
                      <Edit2Icon className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <button
        onClick={exportToExcel}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors mt-2"
      >
        Export as Excel
      </button>

      {/* Transaction Detail */}
      {showDetail && (
        <TransactionDetail
          selectedProducts={selectedTransaction.products}
          trxnId={selectedTransaction.id}
          date={selectedTransaction.date}
          time={selectedTransaction.time}
          total={selectedTransaction.total}
          onClose={() => {
            setShowDetail(false);
          }}
        />
      )}
    </section>
  );
};

export default Transactions;
