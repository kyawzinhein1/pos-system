import { PrinterCheck, PrinterCheckIcon, X } from "lucide-react";

const Invoice = ({ selectedProducts, onClose }) => {
  // Calculate total price
  const totalPrice = selectedProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Payment Info</h2>

        <div className="flex justify-between">
          <p>Casher - Ano_1</p>
          <div>
            <p>Date - {new Date().toLocaleDateString("en-GB")}</p>
            <p>
              Time -{" "}
              {new Date().toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
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
                <td className="border px-2 py-1">{item.name}</td>
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
          <strong>Total: {totalPrice} Kyats</strong>
        </div>
        <p className="text-center font-thin">Thank you for shopping with us.</p>

        <div className="mt-4 flex justify-between">
          <button
            className="bg-red-500 hover:bg-red-600 transition-colors text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            <X />
          </button>
          <button className="bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-md">
            <PrinterCheckIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
