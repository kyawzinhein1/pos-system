import { useEffect, useState } from "react";
import useSaleStore from "../store/sale";
import useProductStore from "../store/product";
import Invoice from "../components/Invoice";
import { LucideShoppingCart, X } from "lucide-react";

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

  // for showing pop up invoice
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOrder = async () => {
    await reduceStock(selectedProducts);
    setShowInvoice(true);
  };

  // change date format
  const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <section className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Sale</h1>
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

          <input
            type="date"
            className="border border-gray-400 px-4 py-2 rounded-md w-60"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
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
          <div className="w-[100%]">
            {/* products show after selected */}
            <div className="mt-5">
              <div>
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
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
                        Date
                      </th>
                      <th scope="col" className="px-1 py-3 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedProducts.length < 1 && (
                      <tr className="font-semibold text-red-600 mt-6">
                        <td className="ps-14">
                          No product is added! Please add a product.
                        </td>
                      </tr>
                    )}

                    {selectedProducts.map((item, index) => (
                      <tr key={index} className="bg-white border-b">
                        <td className="py-4 text-center">{item.name}</td>
                        <td className="py-4 text-center">{item.price}</td>
                        <td className="py-4 text-center">{item.quantity}</td>
                        <td className="px-4 py-4 text-center">
                          {item.price * item.quantity}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {formatDate(item.date) || ""}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() => removeProduct(item.name)}
                            className="bg-red-500 p-1 text-white rounded-md hover:bg-red-600 transition-colors"
                          >
                            <X />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* button section */}
            <div>
              {selectedProducts.length > 0 && (
                <div className="mt-6 flex justify-end gap-3">
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
          onClose={() => {
            setShowInvoice(false);
            clearSelectedProducts("");
          }}
        />
      )}
    </section>
  );
};

export default Sale;
