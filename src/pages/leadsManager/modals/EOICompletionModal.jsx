import React, { useState } from "react";
import { CheckCircle, MessageCircle } from "lucide-react";

const EOICompletionModal = ({ lead, onClose, onSave }) => {
  const [eoiDate, setEoiDate] = useState("");
  const [eoiTime, setEoiTime] = useState("");
  const [notes, setNotes] = useState("");
  const [followupDate, setFollowupDate] = useState("");
  const [followupTime, setFollowupTime] = useState("");

  const handleSave = () => {
    const interaction = {
      type: "eoi_completed",
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleTimeString(),
      note: notes || "EOI payment completed",
      eoiDate,
      eoiTime,
      amount: notes.includes('₹') ? notes.match(/₹(\d+)/)?.[1] : null
    };
    
    onSave(lead.id, { 
      status: "EOI Completed",
      interactions: [...lead.interactions, interaction]
    }, interaction);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">EOI Completion</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">EOI Date & Time</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={eoiDate}
                onChange={(e) => setEoiDate(e.target.value)}
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
              <input
                type="time"
                value={eoiTime}
                onChange={(e) => setEoiTime(e.target.value)}
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Project</label>
            <input
              type="text"
              value={lead.project}
              disabled
              className="w-full border rounded px-3 py-2 text-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Enter EOI amount and details... (e.g., Paid ₹50,000 as EOI)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Follow-up Date & Time</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={followupDate}
                onChange={(e) => setFollowupDate(e.target.value)}
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
              <input
                type="time"
                value={followupTime}
                onChange={(e) => setFollowupTime(e.target.value)}
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 flex items-center justify-center gap-2"
          >
            <CheckCircle size={16} />
            Save EOI Completion
          </button>

          <button className="w-full border border-green-600 text-green-600 py-2 rounded hover:bg-green-50 flex items-center justify-center gap-2">
            <MessageCircle size={16} />
            Send WhatsApp Message
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

export default EOICompletionModal;