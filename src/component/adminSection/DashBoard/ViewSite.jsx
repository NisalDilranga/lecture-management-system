import React from "react";

const ViewSite = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">View Site</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Site Preview</h2>
        <p>This page would typically provide a preview of the public-facing website.</p>
        <div className="mt-4">
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Open Website in New Tab
          </a>
        </div>
      </div>
    </div>
  );
};

export default ViewSite;
