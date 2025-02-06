import { useEffect, useState } from "react";
import useSaleStore from "../store/sale";
import useProductStore from "../store/product";
import useTransactionStore from "../store/transactions";
import Invoice from "../components/Invoice";
import { LucideShoppingCart, X } from "lucide-react";
import Message from "../components/Message";
import BackBtn from "../components/BackBtn";

const Sale = () => {
  const {
    selectedProducts,
    selectedProduct,
    quantity,
    date,
    products,
    fetchProducts,
    setSelectedProduct,
    setQuantity,
    setDate,
    addProductToCart,
    removeProduct,
    clearSelectedProducts,
  } = useSaleStore();

  const { reduceStock } = useProductStore();

  const { saveTransaction } = useTransactionStore();

  // for showing pop up invoice
  const [showInvoice, setShowInvoice] = useState(false);
  const [trxnId, setTrxnId] = useState(null);
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOrder = async () => {
    // Get today's date in dd-mm-yyyy format
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB").split("/").join("");

    // Generate a unique 5-digit ID
    const uniqueId = Math.floor(10000 + Math.random() * 90000); // Ensures 5 digits

    // Generate new transaction ID
    const transactionId = `${formattedDate}${uniqueId}`;

    // transaction object
    const transactionDetail = {
      id: transactionId, // Unique order ID
      products: selectedProducts,
      total: selectedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      date: new Date().toLocaleDateString("en-GB"),
      time: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    // check stock for showing invoice
    if (selectedProducts[0].stock >= selectedProducts[0].quantity) {
      await reduceStock(selectedProducts);
      await saveTransaction(transactionDetail);
      setTrxnId(transactionId);
      setShowInvoice(true);
    } else {
      setShowMsg(true);
    }
  };

  // change date format
  const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`;
  };

  // today as default value
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensure two digits
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD for the date input
  };

  return (
    <section className="container mx-auto mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-8">Sale</h1>
        <BackBtn />
      </div>
      <div>
        {/* selection section */}
        <div className="flex gap-4 justify-center">
          <select
            className="border border-gray-400 px-3 py-2 rounded-lg cursor-pointer w-60"
            value={selectedProduct}
            onChange={(e) => {
              setSelectedProduct(e.target.value);
            }}
          >
            <option hidden>Select Products</option>
            {products.map((product, index) => (
              <option key={index} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="border border-gray-400 px-4 py-2 rounded-md w-60"
            disabled
            value={
              products.find((p) => p.name === selectedProduct)?.price || ""
            }
            placeholder="No item selected ..."
          />

          <input
            type="number"
            placeholder="Enter quantity ..."
            className="border border-gray-400 px-4 py-2 rounded-md w-60"
            value={quantity === 0 ? "" : quantity}
            onChange={(e) => {
              const value = e.target.value;
              setQuantity(Number(value));
            }}
          />

          {/* <input
            type="date"
            className="border border-gray-400 px-4 py-2 rounded-md w-60"
            value={date || getTodayDate()}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          /> */}

          <button
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition-all"
            onClick={addProductToCart}
          >
            <div className="flex gap-2">
              <LucideShoppingCart /> <span>Add to Cart</span>
            </div>
          </button>
        </div>

        <div className="flex justify-between gap-6">
          <div className="w-[100%]">
            {/* products show after selected */}
            <div className="mt-5">
              <div>
                <div className="max-h-[388px] overflow-y-auto border border-gray-300 rounded-lg">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th scope="col" className="px-3 py-3">
                          No
                        </th>
                        <th scope="col" className="py-3">
                          Product name
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Sale Price
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Quantity
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Price
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Stock
                        </th>
                        <th scope="col" className="px-1 py-3 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedProducts.length < 1 && (
                        <tr className="font-semibold text-red-600 mt-6">
                          <td
                            colSpan={8}
                            className="text-center text-red-600 py-4"
                          >
                            No product is added! Please add a product.
                          </td>
                        </tr>
                      )}

                      {selectedProducts.map((item, index) => (
                        <tr key={index} className="bg-white border-b">
                          <td className="py-2 text-center">{index + 1}</td>
                          <td className="py-2 text-center">{item.name}</td>
                          <td className="py-2 text-center">{item.price}</td>
                          <td className="py-2 text-center">{item.quantity}</td>
                          <td className="px-4 py-2 text-center">
                            {item.price * item.quantity}
                          </td>
                          {/* <td className="px-4 py-4 text-center">
                            {formatDate(item.date) ||
                              formatDate(getTodayDate())}
                          </td> */}
                          <td
                            className={`px-4 py-2 text-center font-semibold ${
                              item.stock <= 10
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {item.stock}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => removeProduct(item.name)}
                              className="bg-red-500 p-1 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4"/>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* button section */}
            <div>
              {selectedProducts.length > 0 && (
                <div className="mt-3 flex justify-end gap-3">
                  <button
                    className="bg-green-500 rounded-md text-white hover:bg-green-600 transition-all w-20 h-10"
                    onClick={handleOrder}
                  >
                    <div className="flex gap-2 ps-2">
                      <LucideShoppingCart />
                      <span>Sell</span>
                    </div>
                  </button>
                  <button
                    className="bg-red-500 rounded-md text-white hover:bg-red-600 transition-all w-20 h-10"
                    onClick={clearSelectedProducts}
                  >
                    <div className="flex p-2">
                      <X />
                      <span>Cancel</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* pop up invoice section */}
      {showInvoice && (
        <Invoice
          selectedProducts={selectedProducts}
          trxnId={trxnId}
          onClose={() => {
            setShowInvoice(false);
            clearSelectedProducts("");
          }}
          onSave={() => {
            saveTransaction();
          }}
        />
      )}

      {/* show message */}
      {showMsg && (
        <Message
          closeMsg={() => {
            setShowMsg(false);
          }}
          message="Low stock! Please check again."
        />
      )}
    </section>
  );
};

export default Sale;
