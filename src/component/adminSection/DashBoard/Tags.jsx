import React from "react";

const Tags = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tags</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Tag Management</h2>
        <p>Create and manage tags for categorizing content.</p>
        <div className="mt-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
            Create New Tag
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tags;
