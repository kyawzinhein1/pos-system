import { useEffect, useState } from "react";
import useProductStore from "../store/product";

const Products = () => {
  const { products, fetchProducts, addProduct, removeProductFromList } =
    useProductStore();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!name || !category || !price) {
      alert("Please fill all fields.");
      return;
    }

    const newProduct = {
      name,
      category,
      price: Number(price),
    };

    await addProduct(newProduct);
    setName("");
    setCategory("");
    setPrice("");
  };

  return (
    <section className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Products Management</h1>

      {/* Add Product Form */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Product Name"
          className="border border-gray-400 px-4 py-2 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          className="border border-gray-400 px-4 py-2 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="border border-gray-400 px-4 py-2 rounded-md"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          className="bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-blue-800 transition-all"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="text-center border border-gray-300">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">{product.price}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-red-600 px-3 py-1 text-white rounded-md hover:bg-red-800 transition-all"
                  onClick={() => removeProductFromList(product.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Products;
