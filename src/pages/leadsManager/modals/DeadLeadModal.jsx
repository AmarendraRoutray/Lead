import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { deadReasons } from "../data/constants";

const DeadLeadModal = ({ lead, onClose, onSave }) => {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    const interaction = {
      type: "lead_declared_dead",
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleTimeString(),
      note: `Lead declared dead: ${reason}`,
      reason,
      additionalNotes: notes
    };
    
    onSave(lead.id, { 
      status: "Dead Lead",
      interactions: [...lead.interactions, interaction]
    }, interaction);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Mark Lead as Dead</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Reason</label>
            <select 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">Select reason</option>
              {deadReasons.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Add any additional details..."
            />
          </div>

          <button 
            onClick={handleSave}
            disabled={!reason}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CheckCircle size={16} />
            Mark as Dead Lead
          </button>
        </div>

        <button 
          onClick={onClose}
          className="mt-4 w-full border border-gray-300 py-2 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeadLeadModal;