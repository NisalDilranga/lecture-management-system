import React from "react";

const Products = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Product Management</h2>
        <p>Product catalog and inventory management tools will be displayed here.</p>
        <div className="mt-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors mr-2">
            Add New Product
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
            Import Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
