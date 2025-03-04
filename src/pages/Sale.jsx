import { useEffect, useState, useMemo, useCallback } from "react";
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
    products,
    fetchProducts,
    setSelectedProduct,
    setQuantity,
    addProductToCart,
    removeProduct,
    clearSelectedProducts,
  } = useSaleStore();

  const { reduceStock } = useProductStore();
  const { saveTransaction } = useTransactionStore();

  const [showInvoice, setShowInvoice] = useState(false);
  const [trxnId, setTrxnId] = useState(null);
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOrder = useCallback(async () => {
    if (selectedProducts.length === 0) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB").split("/").join("");
    const uniqueId = Math.floor(10000 + Math.random() * 90000);
    const transactionId = `${formattedDate}${uniqueId}`;

    const transactionDetail = {
      transactionId,
      products: selectedProducts,
      total: selectedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      date: today.toLocaleDateString("en-GB"),
      time: today.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    if (selectedProducts.every((item) => item.stock >= item.quantity)) {
      await reduceStock(selectedProducts);
      await saveTransaction(transactionDetail);
      setTrxnId(transactionId);
      setShowInvoice(true);
    } else {
      setShowMsg(true);
    }
  }, [selectedProducts, reduceStock, saveTransaction]);

  const memoizedProductList = useMemo(() => {
    return (
      <div className="mt-5">
        <div>
          <div className="max-h-[388px] overflow-y-auto border border-gray-300 rounded-lg">
            {console.log("Product list rendered.")}
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 sticky top-0 -z-10">
                <tr>
                  <th className="px-3 py-3">No</th>
                  <th className="py-3">Product name</th>
                  <th className="px-4 py-3 text-center">Sale Price</th>
                  <th className="px-4 py-3 text-center">Quantity</th>
                  <th className="px-4 py-3 text-center">Price</th>
                  <th className="px-4 py-3 text-center">Stock</th>
                  <th className="px-1 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {selectedProducts.length < 1 && (
                  <tr className="font-semibold text-red-600 mt-6">
                    <td colSpan={8} className="text-center text-red-600 py-4">
                      No product is added! Please add a product.
                    </td>
                  </tr>
                )}

                {selectedProducts.map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="py-2 text-center">{index + 1}</td>
                    <td className="py-2 text-center">{item.productName}</td>
                    <td className="py-2 text-center">{item.price}</td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="px-4 py-2 text-center">
                      {item.price * item.quantity}
                    </td>
                    <td
                      className={`px-4 py-2 text-center font-semibold ${
                        item.stock <= 10 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {item.stock}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => removeProduct(item.productName)}
                        className="bg-red-500 p-1 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }, [selectedProducts]);

  const memoizedInvoice = useMemo(() => {
    if (!showInvoice) return null;
    return (
      <Invoice
        selectedProducts={selectedProducts}
        trxnId={trxnId}
        onClose={() => setShowInvoice(false)}
        onSave={() => clearSelectedProducts()}
      />
    );
  }, [showInvoice, trxnId, selectedProducts]);

  return (
    <section className="container mx-auto mt-4">
      {memoizedInvoice}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-8">Sale</h1>
        <BackBtn />
      </div>

      <div>
        <div className="flex gap-4 justify-center">
          {console.log("Product select rendered.")}
          <select
            className="border border-gray-400 px-3 py-2 rounded-lg cursor-pointer w-60"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option hidden>Select Products</option>
            {products.map((product, index) => (
              <option key={index} value={product.productName}>
                {product.productName}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="border border-gray-400 px-4 py-2 rounded-md w-60"
            disabled
            value={
              products.find((p) => p.productName === selectedProduct)?.price ||
              ""
            }
            placeholder="No item selected ..."
          />

          <input
            type="number"
            placeholder="Enter quantity ..."
            className="border border-gray-400 px-4 py-2 rounded-md w-60"
            value={quantity || ""}
            onChange={(e) => setQuantity(Number(e.target.value) || "")}
          />

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
          <div className="w-[100%]">{memoizedProductList}</div>
        </div>

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
    </section>
  );
};

export default Sale;
