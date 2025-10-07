import { NotebookPen, X } from "lucide-react";
import { useState } from "react";

export const CreateNoteModal = ({ lead, onClose, onSave }) => {
    const [noteText, setNoteText] = useState("");
    const [noteType, setNoteType] = useState("general");

    const noteTypes = [
        { value: "general", label: "General Note" },
        { value: "call_summary", label: "Call Summary" },
        { value: "meeting_notes", label: "Meeting Notes" },
        { value: "feedback", label: "Client Feedback" },
        { value: "internal", label: "Internal Note" }
    ];

    const handleSave = () => {
        if (!noteText.trim()) return;

        const interaction = {
            type: "note_added",
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date().toLocaleTimeString(),
            note: noteText,
            noteType: noteType,
            displayText: `Note added: ${noteText.substring(0, 50)}${noteText.length > 50 ? '...' : ''}`
        };

        onSave(interaction);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold">Create Note</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Note Type</label>
                        <select
                            value={noteType}
                            onChange={(e) => setNoteType(e.target.value)}
                            className="w-full border rounded px-3 py-2 text-sm"
                        >
                            {noteTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Note Content</label>
                        <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            rows="6"
                            className="w-full border rounded px-3 py-2 text-sm"
                            placeholder="Enter your notes here..."
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            disabled={!noteText.trim()}
                            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <NotebookPen size={16} />
                            Save Note
                        </button>

                        <button
                            onClick={onClose}
                            className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};