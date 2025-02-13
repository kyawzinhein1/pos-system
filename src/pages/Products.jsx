import { useEffect, useState } from "react";
import useProductStore from "../store/product";
import { PlusCircleIcon, Edit2Icon, TrashIcon, Save } from "lucide-react";
import BackBtn from "../components/BackBtn";
import ProductForm from "../components/ProductForm";

const Products = () => {
  const {
    products,
    fetchProducts,
    addProduct,
    removeProductFromList,
  } = useProductStore();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [editingId, setEditingId] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [showEdit, setShowEdit] = useState(false);

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


  // const handleEditProduct = async (id) => {
  //   if (
  //     !editedProduct.name ||
  //     !editedProduct.category ||
  //     !editedProduct.price ||
  //     !editedProduct.stock
  //   ) {
  //     alert("Please fill all field.");
  //     return;
  //   }
  //   await editProduct(id, editedProduct);
  //   setEditingId(null);
  // };

  // Filter products based on search key
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchKey.toLowerCase().trim()) ||
      product.category.toLowerCase().includes(searchKey.toLowerCase().trim())
  );

  return (
    <section className="container mx-auto mt-4">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold mb-6">Product Management</h1>

        <input
          type="text"
          placeholder="Search products ..."
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <BackBtn />
      </div>

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
      <div className="max-h-[388px] overflow-y-auto border border-gray-300 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">No</th>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Stock</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={index} className="text-center border border-gray-300">
                <td
                  className={`px-4 py-4 text-center ${
                    product.stock <= 0 && "text-red-600 font-semibold"
                  }`}
                >
                  {index + 1}
                </td>
                <td
                  className={`px-4 py-4 text-center ${
                    product.stock <= 0 && "text-red-600 font-semibold"
                  }`}
                >
                  {product.name}
                </td>
                <td
                  className={`px-4 py-4 text-center ${
                    product.stock <= 0 && "text-red-600 font-semibold"
                  }`}
                >
                  {product.category}
                </td>
                <td
                  className={`px-4 py-4 text-center ${
                    product.stock <= 0 && "text-red-600 font-semibold"
                  }`}
                >
                  {product.price}
                </td>
                <td
                  className={`px-4 py-4 text-center font-semibold ${
                    product.stock <= 10 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {product.stock}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-yellow-500 p-2 rounded-full text-white hover:bg-yellow-600 mr-2 transition-colors"
                    onClick={() => {
                      setEditingId(product.id);
                      setEditedProduct(product);
                      setShowEdit(true);
                    }}
                  >
                    <Edit2Icon className="w-4 h-4" />
                  </button>
                  <button
                    className="bg-red-500 p-2 text-white rounded-full hover:bg-red-600 transition-colors"
                    onClick={() => removeProductFromList(product.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEdit && (
        <ProductForm
          onClose={() => {
            setShowEdit(false);
          }}
          editedProduct={editedProduct}
        />
      )}
    </section>
  );
};

export default Products;
