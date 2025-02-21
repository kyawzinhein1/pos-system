import useProductStore from "../store/product";
import { useState, useEffect } from "react";

const ProductForm = ({ editedProduct, onClose }) => {
  const { editProduct, updateProductInList } = useProductStore();
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    price: "",
    stock: "",
  });

  // Set initial state when component mounts or when `editedProduct` changes
  useEffect(() => {
    if (editedProduct) {
      setProduct({
        id: editedProduct._id,
        productName: editedProduct.productName || "", // Fix field name
        category: editedProduct.category || "",
        price: editedProduct.price || "",
        stock: editedProduct.stock || "",
      });
    }
  }, [editedProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSaveProduct = async () => {
    // if (
    //   !product.productName||
    //   !product.category ||
    //   !product.price ||
    //   !product.stock
    // ) {
    //   alert("Please fill in all fields.");
    //   return;
    // }

    if (product.id) {
      const updatedProduct = await editProduct(product.id, { ...product }); // Send product object directly
      updateProductInList(updatedProduct);
    }
    console.log(editProduct);
    onClose();
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg flex flex-col">
        <h1 className="text-xl font-semibold mb-4 text-center">Product Edit</h1>
        <label htmlFor="name" className="font-semibold text-md mb-2">
          Name
        </label>
        <input
          type="text"
          name="productName"
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
          value={product.productName}
          onChange={handleChange}
        />
        <label htmlFor="category" className="font-semibold text-md mb-2">
          Category
        </label>
        <input
          type="text"
          name="category"
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
          value={product.category}
          onChange={handleChange}
        />

        <label htmlFor="price" className="font-semibold text-md mb-2">
          Price
        </label>
        <input
          type="number"
          name="price"
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
          value={product.price}
          onChange={handleChange}
        />

        <label htmlFor="stock" className="font-semibold text-md mb-2">
          Stock
        </label>
        <input
          type="number"
          name="stock"
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
          value={product.stock}
          onChange={handleChange}
        />
        <div className="flex justify-between">
          <button
            className="bg-gray-500 hover:bg-gray-600 transition-colors text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Close
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded-md"
            onClick={handleSaveProduct}
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductForm;
