import React, { useState } from "react";
import { PlusCircleIcon } from "lucide-react";

const AddProductForm = React.memo(({ onAdd }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = () => {
    if (!name || !category || !price || !stock) {
      alert("Please fill all fields.");
      return;
    }
    onAdd({ name, category, price, stock });
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 w-full max-w-4xl mx-auto">
      {console.log("Add Product Form rendered.")}

      <input
        type="text"
        placeholder="Product Name"
        className="border px-4 py-2 rounded-md w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        className="border px-4 py-2 rounded-md w-full"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="border px-4 py-2 rounded-md w-full"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        className="border px-4 py-2 rounded-md w-full"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <button
        className="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-600 transition-all w-full sm:col-span-2 lg:col-span-1 flex justify-center items-center"
        onClick={handleSubmit}
      >
        <PlusCircleIcon className="mr-2" /> <span>Add Product</span>
      </button>
    </div>
  );
});

export default AddProductForm;
