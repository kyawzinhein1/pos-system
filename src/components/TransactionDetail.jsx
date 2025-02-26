import { PrinterCheckIcon, X } from "lucide-react";

const TransactionDetail = ({
  selectedProducts,
  trxnId,
  date,
  time,
  total,
  onClose,
  onSave,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Transaction Detail
        </h1>

        <div className="flex justify-between">
          <p>ID - {trxnId}</p>
          <div>
            <p>Date - {date}</p>
            <p>Time -{time}</p>
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-300 mt-2">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Product</th>
              <th className="border px-2 py-1">Amt</th>
              <th className="border px-2 py-1">Qty</th>
              <th className="border px-2 py-1">Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((item, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{item.productName}</td>
                <td className="border px-2 py-1">{item.price}</td>
                <td className="border px-2 py-1 text-center">
                  {item.quantity}
                </td>
                <td className="border px-2 py-1 text-right">
                  {item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-right">
          <strong>Total: {total} Kyats</strong>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            className="bg-red-500 hover:bg-red-600 transition-colors text-white px-2 py-2 rounded-full"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 transition-colors text-white px-2 py-2 rounded-full"
            onClick={onSave}
          >
            <PrinterCheckIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
