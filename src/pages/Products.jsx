import { useEffect, useState } from "react";
import useProductStore from "../store/product";
import { PlusCircleIcon, Edit2Icon, TrashIcon, Save } from "lucide-react";

const Products = () => {
  const {
    products,
    fetchProducts,
    addProduct,
    editProduct,
    removeProductFromList,
  } = useProductStore();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!name || !category || !price || !stock) {
      alert("Please fill all fields.");
      return;
    }

    const newProduct = {
      name,
      category,
      price: Number(price),
      stock: Number(stock),
    };

    await addProduct(newProduct);
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
  };

  const handleEditProduct = async (id) => {
    if (
      !editedProduct.name ||
      !editedProduct.category ||
      !editedProduct.price ||
      !editedProduct.stock
    ) {
      alert("Please fill all field.");
      return;
    }
    await editProduct(id, editedProduct);
    setEditingId(null);
  };

  return (
    <section className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      {/* Add Product Form */}
      <div className="flex gap-4 mb-6 justify-center">
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
        <input
          type="number"
          placeholder="Stock"
          className="border border-gray-400 px-4 py-2 rounded-md"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button
          className="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-600 transition-all"
          onClick={handleAddProduct}
        >
          <div className="flex gap-2">
            <PlusCircleIcon /> <span>Add Product</span>
          </div>
        </button>
      </div>

      {/* Product List */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="text-center border border-gray-300">
              <td className="px-4 py-2">
                {editingId === product.id ? (
                  <input
                    type="text"
                    value={editedProduct.name}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        name: e.target.value,
                      })
                    }
                    autoFocus
                    className="focus:ring-2 focus:ring-blue-500 outline-none rounded-sm border border-blue-500 ps-1"
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === product.id ? (
                  <input
                    type="text"
                    value={editedProduct.category}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        category: e.target.value,
                      })
                    }
                    className="focus:ring-2 focus:ring-blue-500 outline-none rounded-sm border border-blue-500 ps-1"
                  />
                ) : (
                  product.category
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === product.id ? (
                  <input
                    type="number"
                    value={editedProduct.price === 0 ? "" : editedProduct.price}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: Number(e.target.value),
                      })
                    }
                    className="focus:ring-2 focus:ring-blue-500 outline-none rounded-sm border border-blue-500 ps-1"
                  />
                ) : (
                  product.price
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === product.id ? (
                  <input
                    type="number"
                    value={editedProduct.stock === 0 ? "" : editedProduct.stock}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        stock: Number(e.target.value),
                      })
                    }
                    className="focus:ring-2 focus:ring-blue-500 outline-none rounded-sm border border-blue-500 ps-1"
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === product.id ? (
                  <button
                    className="bg-green-500 px-3 py-1 text-white rounded-md hover:bg-green-600"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    <Save className="w-5" />
                  </button>
                ) : (
                  <>
                    <button
                      className="bg-yellow-500 px-3 py-1 text-white rounded-md hover:bg-yellow-600 mr-2 transition-colors"
                      onClick={() => {
                        setEditingId(product.id);
                        setEditedProduct(product);
                      }}
                    >
                      <Edit2Icon className="w-4" />
                    </button>
                    <button
                      className="bg-red-500 px-3 py-1 text-white rounded-md hover:bg-red-600 transition-colors"
                      onClick={() => removeProductFromList(product.id)}
                    >
                      <TrashIcon className="w-5" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Products;
