import React, { useEffect, useState, useCallback, useMemo } from "react";
import useProductStore from "../store/product";

import BackBtn from "../components/BackBtn";
import AddProductForm from "../components/AddProductForm";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

const Products = () => {
  const { products, fetchProducts, addProduct, removeProductFromList } =
    useProductStore();

  const [searchKey, setSearchKey] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = useCallback(
    async (newProduct) => {
      const productData = {
        productName: newProduct.name,
        category: newProduct.category,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      };
      await addProduct(productData);
      fetchProducts();
    },
    [addProduct, fetchProducts]
  );

  const handleRemoveProduct = useCallback(
    async (_id) => {
      await removeProductFromList(_id);
      fetchProducts();
    },
    [removeProductFromList, fetchProducts]
  );

  const handleEditProduct = useCallback((product) => {
    setEditedProduct(product);
    setShowEdit(true);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchKey.toLowerCase()) ||
        product.category.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [products, searchKey]);

  return (
    <section className="container mx-auto mt-4 px-4">
      {console.log("Products Page rendered.")}
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <h1 className="text-xl md:text-2xl font-bold text-center sm:text-left">
          Product Management
        </h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
        />
        {/* Back Button */}
        <div className="lg:block hidden">
          <BackBtn />
        </div>
      </div>

      {/* Add Product Form */}
      <AddProductForm onAdd={handleAddProduct} />

      {/* Product List */}
      <ProductList
        products={filteredProducts}
        onEdit={handleEditProduct}
        onRemove={handleRemoveProduct}
      />

      {/* Edit Product Modal */}
      {showEdit && (
        <ProductForm
          onClose={() => setShowEdit(false)}
          editedProduct={editedProduct}
        />
      )}
    </section>
  );
};

export default Products;
