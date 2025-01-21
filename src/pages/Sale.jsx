import React, { useState } from "react";

const Sale = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");

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
  const calculatedPrice = selectedProductData
    ? selectedProductData.price * (quantity)
    : "";

  const handleAddtoCart = () => {
    if (!selectedProduct) {
      alert("Plase choose a product.");
      return;
    }

    const productToAdd = products.find((p) => p.name == selectedProduct);

    if (productToAdd) {
      setSelectedProducts((prev) => [
        ...prev,
        { ...productToAdd, quantity: quantity },
      ]);
      setSelectedProduct("");
      setQuantity("");
    }
    // console.log(productToAdd);
  };

  return (
    <section>
      <div>
        {/* selection section */}
        <div className="mt-6 w-full">
          <select
            className="w-3xl border border-blue-600 px-2 py-2"
            value={selectedProduct}
            onChange={(e) => {
              setSelectedProduct(e.target.value);
            }}
          >
            <option value="">Select Products</option>
            {products.map((product, index) => (
              <option key={index} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Enter quantity ..."
            className="border border-blue-600 px-3 py-2 outline-none"
            value={quantity === 0 ? "" : quantity}
            onChange={(e) => {
              const value = e.target.value;
              setQuantity(Number(value));
            }}
          />

          <input
            type="number"
            className="border border-blue-600 px-3 py-2 outline-none"
            disabled
            value={calculatedPrice}
            placeholder="Total price"
          />

          <button
            className="bg-blue-600 px-3 py-2 text-white"
            onClick={handleAddtoCart}
          >
            Add to cart
          </button>
        </div>

        {/* products show after selected */}
        <div className="mt-5">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
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
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>preview section</div>
    </section>
  );
};

export default Sale;
