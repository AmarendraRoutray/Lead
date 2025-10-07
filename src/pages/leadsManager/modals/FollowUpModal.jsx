import React, { useState } from "react";
import { Calendar, MessageCircle } from "lucide-react";
import { intentOptions } from "../data/constants";

const FollowUpModal = ({ lead, onClose, onSave }) => {
  const [followupDate, setFollowupDate] = useState("");
  const [followupTime, setFollowupTime] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedIntent, setSelectedIntent] = useState(lead.intent);

  const handleSave = () => {
    const interaction = {
      type: "follow_up_scheduled",
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleTimeString(),
      note: notes,
      followupDate,
      followupTime,
      intent: selectedIntent
    };
    onSave(interaction);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Schedule Follow-up</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Intent</label>
            <select 
              value={selectedIntent}
              onChange={(e) => setSelectedIntent(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              {intentOptions.map(opt => (
                <option key={opt.label} value={opt.label}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Follow-up Date</label>
            <input
              type="date"
              value={followupDate}
              onChange={(e) => setFollowupDate(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Follow-up Time</label>
            <input
              type="time"
              value={followupTime}
              onChange={(e) => setFollowupTime(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Add notes about the follow-up..."
            />
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Calendar size={16} />
            Save Follow-up
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

export default FollowUpModal;