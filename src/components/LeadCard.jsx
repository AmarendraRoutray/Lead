// src/pages/LeadsManager/components/LeadCard.jsx
import React from "react";

function LeadCard({ lead, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800">{lead.name}</h3>
      <p className="text-sm text-gray-600">{lead.email}</p>
      <p className="text-sm text-gray-600">{lead.phone}</p>

      <div className="flex justify-between items-center mt-3">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            lead.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {lead.status}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit && onEdit(lead)}
            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete && onDelete(lead.id)}
            className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeadCard;
