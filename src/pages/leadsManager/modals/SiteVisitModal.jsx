import React, { useState } from "react";
import { Calendar, CheckCircle } from "lucide-react";

const SiteVisitModal = ({ lead, onClose, onSave, onMarkComplete }) => {
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [notes, setNotes] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleScheduleVisit = () => {
    const interaction = {
      type: visitDate && lead.interactions.some(i => i.type === "site_visit_scheduled") 
        ? "site_visit_rescheduled" 
        : "site_visit_scheduled",
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleTimeString(),
      note: notes,
      visitDate,
      visitTime
    };
    onSave(interaction);
  };

  const handleMarkComplete = () => {
    onMarkComplete();
    setShowConfirmation(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Schedule Site Visit</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Visit Date</label>
            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Visit Time</label>
            <input
              type="time"
              value={visitTime}
              onChange={(e) => setVisitTime(e.target.value)}
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
              placeholder="Add notes about the site visit..."
            />
          </div>

          <button 
            onClick={handleScheduleVisit}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Calendar size={16} />
            Schedule Site Visit
          </button>

          {lead.status === "SV Scheduled" && (
            <button 
              onClick={() => setShowConfirmation(true)}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <CheckCircle size={16} />
              Site Visit Done
            </button>
          )}
        </div>

        {showConfirmation && (
          <div className="mt-4 p-4 border border-yellow-300 bg-yellow-50 rounded">
            <p className="font-semibold mb-2">Are you confirmed?</p>
            <div className="flex gap-2">
              <button 
                onClick={handleMarkComplete}
                className="flex-1 bg-green-600 text-white py-1 rounded text-sm"
              >
                Yes
              </button>
              <button 
                onClick={() => setShowConfirmation(false)}
                className="flex-1 border border-gray-300 py-1 rounded text-sm"
              >
                No
              </button>
            </div>
          </div>
        )}

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

export default SiteVisitModal;