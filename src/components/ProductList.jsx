import React from "react";
import { Edit2Icon, TrashIcon } from "lucide-react";

const ProductList = React.memo(({ products, onEdit, onRemove }) => {
  return (
    <div className="max-h-[388px] overflow-y-auto border border-gray-300 rounded-lg">
      {console.log("Product List rendered.")}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-100">
            <tr className="text-sm md:text-base">
              <th className="border px-2 md:px-4 py-2">No</th>
              <th className="border px-2 md:px-4 py-2">Product Name</th>
              <th className="border px-2 md:px-4 py-2">Category</th>
              <th className="border px-2 md:px-4 py-2">Price</th>
              <th className="border px-2 md:px-4 py-2">Stock</th>
              <th className="border px-2 md:px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id || product._id}
                className="text-center border text-sm md:text-base"
              >
                <td className="px-2 md:px-4 py-2">{index + 1}</td>
                <td className="px-2 md:px-4 py-2">{product.productName}</td>
                <td className="px-2 md:px-4 py-2">{product.category}</td>
                <td className="px-2 md:px-4 py-2">{product.price}</td>
                <td
                  className={`px-2 md:px-4 py-2 font-semibold ${
                    product.stock <= 10 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {product.stock}
                </td>
                <td className="px-2 md:px-4 py-2">
                  <button
                    className="bg-yellow-500 p-2 rounded-full text-white hover:bg-yellow-600 mr-2"
                    onClick={() => onEdit(product)}
                  >
                    <Edit2Icon className="w-4 h-4" />
                  </button>
                  <button
                    className="bg-red-500 p-2 text-white rounded-full hover:bg-red-600"
                    onClick={() => onRemove(product._id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default ProductList;
