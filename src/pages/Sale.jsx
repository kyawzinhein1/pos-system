import React, { useState } from "react";
import useSaleStore from "../store/store";

const Sale = () => {
  const {
    selectedProducts,
    selectedProduct,
    quantity,
    date,
    products,
    setSelectedProduct,
    setQuantity,
    setDate,
    addProductToCart,
    removeProduct,
    clearSelectedProducts,
  } = useSaleStore();

  // change date format
  const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <section>
      <div>
        {/* selection section */}
        <div className="mt-6 flex justify-center">
          <select
            className="w-3xl border border-blue-600 px-3 py-2 rounded-l-lg outline-none border-r-0 h-12 w-60 cursor-pointer"
            value={selectedProduct}
            onChange={(e) => {
              setSelectedProduct(e.target.value);
            }}
          >
            <option>Select Products</option>
            {products.map((product, index) => (
              <option key={index} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="border border-blue-600 px-3 py-2 outline-none border-r-0 h-12 w-60"
            disabled
            value={
              products.find((p) => p.name === selectedProduct)?.price || ""
            }
            placeholder="No item selected ..."
          />

          <input
            type="number"
            placeholder="Enter quantity ..."
            className="border border-blue-600 px-3 py-2 outline-none border-r-0 h-12 w-60"
            value={quantity === 0 ? "" : quantity}
            onChange={(e) => {
              const value = e.target.value;
              setQuantity(Number(value));
            }}
          />

          <input
            type="date"
            className="border border-blue-600 border-r-0 px-3 py-2 outline-none cursor-pointer bg-white appearance-none h-12 w-60"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />

          <button
            className="bg-blue-600 px-3 py-2 rounded-r-lg text-white h-12 w-60 hover:bg-blue-800 transition-all"
            onClick={addProductToCart}
          >
            Add
          </button>
        </div>

        <div className="flex justify-between gap-6">
          <div className="w-[70%]">
            {/* products show after selected */}
            <div className="mt-5">
              <div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-center">
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
                        Menu
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedProducts.length < 1 && (
                      <tr className="font-semibold text-red-600 mt-6">
                        <td>No product is added! Please add a product.</td>
                      </tr>
                    )}

                    {selectedProducts.map((item, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-4 py-4 text-center">{item.name}</td>
                        <td className="px-4 py-4 text-center">{item.price}</td>
                        <td className="px-4 py-4 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {item.price * item.quantity}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {formatDate(item.date) || ""}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button onClick={() => removeProduct(item.name)}>
                            X
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
                  <button className="bg-green-600 rounded-md text-white hover:bg-green-800 transition-all w-20 h-10">
                    Order
                  </button>
                  <button
                    className="bg-red-600 rounded-md text-white hover:bg-red-800 transition-all w-20 h-10"
                    onClick={clearSelectedProducts}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* voucher section */}
          {selectedProducts.length > 0 ? (
            <div className="w-[30%] mt-5 border border-gray-300 px-2 text-slate-500 rounded-md shadow-md p-4">
              <h1 className="font-semibold text-center uppercase">
                Voucher Preview
              </h1>

              <div className="flex justify-between">
                <p>Products list</p>
                <p>Date - {new Date().toLocaleDateString("en-GB")}</p>
              </div>

              <table>
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amt
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {selectedProducts.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.price}</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">
                        {item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-[30%] mt-5 border border-gray-300 px-2 text-slate-500 rounded-md shadow-md p-4">
              <h1 className="font-semibold text-center uppercase">
                Voucher Preview
              </h1>

              <h1 className="font-semibold text-red-600 mt-6">
                No data for preview!
              </h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Sale;
