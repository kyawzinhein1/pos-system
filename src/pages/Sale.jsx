import React, { useState } from "react";

const Sale = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");

  const products = [
    {
      name: "Earphone",
      category: "Accessories",
      price: 5000,
    },
    {
      name: "Powerbank",
      category: "Gadget",
      price: 10000,
    },
    {
      name: "Adapter",
      category: "Accessories",
      price: 20000,
    },
    {
      name: "Screen Guard",
      category: "Accessories",
      price: 4500,
    },
  ];

  // Find the selected product
  const selectedProductData = products.find((p) => p.name === selectedProduct);
  // const calculatedPrice = selectedProductData
  //   ? selectedProductData.price * quantity
  //   : "";

  const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const [year, month, day] = inputDate.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleAddtoCart = () => {
    if (!selectedProduct) {
      alert("Plase choose a product.");
      return;
    } else if (!quantity) {
      alert("Please add quantity.");
      return;
    } else if (!date) {
      alert("Date is empty.");
      return;
    }

    const productToAdd = products.find((p) => p.name == selectedProduct);

    if (productToAdd) {
      const formattedDate = formatDate(date);

      setSelectedProducts((prev) => [
        ...prev,
        { ...productToAdd, quantity: quantity, date: formattedDate },
      ]);
      setSelectedProduct("");
      setQuantity("");
      setDate("");
    }
    // console.log(productToAdd);
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
            value={selectedProductData?.price ?? ""}
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
            onClick={handleAddtoCart}
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
                      <th scope="col" className="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Sale Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedProducts.length < 1 && (
                      <h1 className="font-semibold text-red-600 mt-6">
                        No product is added! Please add a product.
                      </h1>
                    )}
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
                        <td className="px-6 py-4">{item.date || ""}</td>
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
                  <button className="bg-red-600 rounded-md text-white hover:bg-red-800 transition-all w-20 h-10">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-[30%] mt-5 border border-gray-300">
            <h1 className="font-semibold text-center uppercase">
              Voucher Preview
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sale;
