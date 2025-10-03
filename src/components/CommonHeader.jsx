// src/pages/LeadsManager/components/CommonHeader.jsx
import React from "react";

function CommonHeader({ searchTerm, onSearch, onAdd, onSortChange, onFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search leads..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="px-3 py-2 border rounded-lg w-full sm:w-64"
      />

      {/* Sort + Filter + Add */}
      <div className="flex items-center gap-3">
        <select
          onChange={(e) => onSortChange && onSortChange(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
          <option value="status">Sort by Status</option>
        </select>

        <select
          onChange={(e) => onFilterChange && onFilterChange(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>

        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Lead
        </button>
      </div>
    </div>
  );
}

export default CommonHeader;
