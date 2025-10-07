import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { messageTemplates } from "../data/constants";

const WhatsAppMessageModal = ({ lead, onClose, onSend }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const handleSend = () => {
    const interaction = {
      type: scheduledDate ? "message_scheduled" : "message_sent",
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleTimeString(),
      note: `WhatsApp message ${scheduledDate ? 'scheduled' : 'sent'}: ${selectedTemplate}`,
      template: selectedTemplate,
      scheduledDate,
      scheduledTime,
      customMessage
    };
    
    onSend(interaction);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Send WhatsApp Message</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Message Template</label>
            <select 
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">Select template</option>
              {messageTemplates.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Custom Message (Optional)</label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows="3"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Or type a custom message..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Schedule Message (Optional)</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="flex-1 border rounded px-3 py-2 text-sm"
                min={new Date().toISOString().split('T')[0]}
              />
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handleSend}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              {scheduledDate ? 'Schedule' : 'Send'} Message
            </button>
            
            <button 
              onClick={() => {
                handleSend();
                onClose();
              }}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              Send Now
            </button>
          </div>
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

export default WhatsAppMessageModal;