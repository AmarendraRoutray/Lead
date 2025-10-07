// src/pages/LeadsManager/modals/LeadDetailsModal.jsx
import React, { useRef, useState } from "react";
import { Calendar, Camera, MessageCircle, CheckCircle, NotebookPen, Edit, X, CircleX, BookOpenCheck, ChevronDown, Check } from "lucide-react";
import { intentOptions } from "../data/constants";
import FollowUpModal from "./FollowUpModal";
import SiteVisitModal from "./SiteVisitModal";
import EOICompletionModal from "./EOICompletionModal";
import BookingCompletionModal from "./BookingCompletionModal";
import DeadLeadModal from "./DeadLeadModal";
import WhatsAppMessageModal from "./WhatsAppMessageModal";
import { CreateNoteModal } from "./CreateNoteModal";
import Dropdown from "../../../components/Dropdown";



const LeadDetailsModal = ({ lead, onClose, onStatusChange }) => {
    const [activeTab, setActiveTab] = useState("followup");
    const [showFollowUpModal, setShowFollowUpModal] = useState(false);
    const [showSiteVisitModal, setShowSiteVisitModal] = useState(false);
    const [showEOIModal, setShowEOIModal] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showDeadLeadModal, setShowDeadLeadModal] = useState(false);
    const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
    const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);
    const [selectedIntent, setSelectedIntent] = useState(lead.intent);
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    // const handleIntentChange = (newIntent) => {
    //     setSelectedIntent(newIntent);
    //     const interaction = {
    //         type: "intent_changed",
    //         date: new Date().toISOString().split('T')[0],
    //         timestamp: new Date().toLocaleTimeString(),
    //         note: `Intent changed to ${newIntent}`,
    //         oldIntent: lead.intent,
    //         newIntent
    //     };
    //     onStatusChange(lead.id, { intent: newIntent }, interaction);
    // };

    const handleSelect = (intent) => {
        setSelectedIntent(intent.label)
        setIsOpen(false)
        const interaction = {
            type: "intent_changed",
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date().toLocaleTimeString(),
            note: `Intent changed to ${intent.label}`,
            oldIntent: lead.intent,
            intent
        };
        onStatusChange(lead.id, { intent: intent.label }, interaction);
        console.log('Selected intent:', intent.label)
    }

    const handleFollowUpSave = (interaction) => {
        const updatedInteractions = [...lead.interactions, interaction];
        onStatusChange(lead.id, { interactions: updatedInteractions }, interaction);
        setShowFollowUpModal(false);
    };

    const handleSiteVisitSave = (interaction) => {
        const updatedInteractions = [...lead.interactions, interaction];
        onStatusChange(lead.id, { interactions: updatedInteractions }, interaction);
        setShowSiteVisitModal(false);
    };

    const handleSiteVisitComplete = () => {
        const interaction = {
            type: "site_visit_completed",
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date().toLocaleTimeString(),
            note: "Site visit completed successfully"
        };
        const updatedInteractions = [...lead.interactions, interaction];
        onStatusChange(lead.id, {
            status: "SV Completed",
            interactions: updatedInteractions
        }, interaction);
        setShowSiteVisitModal(false);
    };

    const handleEOISave = (id, updates, interaction) => {
        onStatusChange(id, updates, interaction);
        setShowEOIModal(false);
    };

    const handleBookingSave = (id, updates, interaction) => {
        onStatusChange(id, updates, interaction);
        setShowBookingModal(false);
    };

    const handleDeadLeadSave = (id, updates, interaction) => {
        onStatusChange(id, updates, interaction);
        setShowDeadLeadModal(false);
    };

    const handleWhatsAppSend = (interaction) => {
        const updatedInteractions = [...lead.interactions, interaction];
        onStatusChange(lead.id, { interactions: updatedInteractions }, interaction);
        setShowWhatsAppModal(false);
    };

    const handleNoteSave = (interaction) => {
        const updatedInteractions = [...lead.interactions, interaction];
        onStatusChange(lead.id, { interactions: updatedInteractions }, interaction);
        setShowCreateNoteModal(false);
    };

    const formatInteraction = (interaction) => {
        const icons = {
            'lead_received': '📥',
            'follow_up_scheduled': '📞',
            'site_visit_scheduled': '📅',
            'site_visit_rescheduled': '🔄',
            'site_visit_completed': '✅',
            'eoi_completed': '💰',
            'booking_completed': '🏠',
            'lead_declared_dead': '❌',
            'intent_changed': '🎯',
            'message_sent': '💬',
            'message_scheduled': '⏰',
            'note_added': '📝'
        };

        const getDisplayText = (interaction) => {
            switch (interaction.type) {
                case 'lead_received':
                    return interaction.note;
                case 'follow_up_scheduled':
                    return `Follow-up scheduled for ${interaction.followupDate} at ${interaction.followupTime}`;
                case 'site_visit_scheduled':
                    return `Site visit scheduled for ${interaction.visitDate} at ${interaction.visitTime}`;
                case 'site_visit_rescheduled':
                    return `Site visit rescheduled to ${interaction.visitDate} at ${interaction.visitTime}`;
                case 'site_visit_completed':
                    return 'Site visit completed';
                case 'eoi_completed':
                    return `EOI completed - ${interaction.note}`;
                case 'booking_completed':
                    return `Booking completed - ${interaction.note}`;
                case 'lead_declared_dead':
                    return `Lead declared dead: ${interaction.reason}`;
                case 'intent_changed':
                    return `Intent changed from ${interaction.oldIntent} to ${interaction.newIntent}`;
                case 'message_sent':
                    return `Message sent: ${interaction.template}`;
                case 'message_scheduled':
                    return `Message scheduled: ${interaction.template} for ${interaction.scheduledDate}`;
                case 'note_added':
                    return `Note: ${interaction.displayText || interaction.note.substring(0, 50)}${interaction.note.length > 50 ? '...' : ''}`;
                default:
                    return interaction.note;
            }
        };

        return {
            ...interaction,
            icon: icons[interaction.type] || '📝',
            displayText: getDisplayText(interaction)
        };
    };

    const currentIntent = intentOptions.find(opt => opt.label === selectedIntent) || intentOptions[0]

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-4 sm:p-6 border-b flex-shrink-0">
                    <div className="min-w-0">
                        <h2 className="text-lg sm:text-xl font-semibold truncate">{lead.name} - Lead Details</h2>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{lead.project} • {lead.source}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl flex-shrink-0 ml-2">
                        ✕
                    </button>
                </div>

                {/* Tabs - Mobile friendly */}
                <div className="flex border-b overflow-x-auto flex-shrink-0">
                    {["followup", "info", "history"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 min-w-[100px] px-3 sm:px-6 py-3 font-medium capitalize text-sm sm:text-base whitespace-nowrap ${activeTab === tab
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab === "followup" ? "Follow Up" :
                                tab === "info" ? "Lead Info" : "History"}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {activeTab === "followup" && (
                        <div className="space-y-6">
                            {/* Intent Section */}
                            <div className="space-y-2">
                                <Dropdown
                                    options={intentOptions}
                                    value={selectedIntent}
                                    onChange={setSelectedIntent}
                                    label="Current Intent"
                                    placeholder="Select intent"
                                />
                            </div>

                            {/* Quick Actions Section */}
                            <div>
                                <h4 className="uppercase text-xs text-gray-500 font-semibold mb-3 tracking-wider">Quick Actions</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                                    <button
                                        onClick={() => setShowCreateNoteModal(true)}
                                        className="bg-white shadow hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-600 py-3 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2"
                                    >
                                        <NotebookPen size={16} />
                                        <span className="hidden sm:inline">Create Note</span>
                                        <span className="sm:hidden">Note</span>
                                    </button>
                                    <button
                                        onClick={() => setShowFollowUpModal(true)}
                                        className="bg-white shadow hover:bg-cyan-600 hover:text-white text-cyan-600 border border-cyan-600 py-3 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2"
                                    >
                                        <Calendar size={16} />
                                        <span className="hidden sm:inline">Add Follow-up</span>
                                        <span className="sm:hidden">Follow-up</span>
                                    </button>
                                    <button
                                        onClick={() => setShowSiteVisitModal(true)}
                                        className="bg-white shadow hover:bg-purple-600 hover:text-white text-purple-600 border border-purple-600 py-3 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2"
                                    >
                                        <Camera size={16} />
                                        <span className="hidden sm:inline">Site Visit</span>
                                        <span className="sm:hidden">Visit</span>
                                    </button>
                                    <button
                                        onClick={() => setShowWhatsAppModal(true)}
                                        className="bg-white shadow hover:bg-green-600 hover:text-white text-green-600 border border-green-600 py-3 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle size={16} />
                                        <span className="hidden sm:inline">Send Message</span>
                                        <span className="sm:hidden">Message</span>
                                    </button>
                                </div>

                                {/* Status Update */}
                                <div className="mt-6 mb-4 border-t pt-6">
                                    <h4 className="uppercase text-xs text-gray-500 font-semibold mb-3 tracking-wider">Status Update</h4>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <button
                                            className="flex-1 px-4 sm:px-6 bg-purple-100 text-purple-700 font-semibold py-2 rounded-lg hover:bg-purple-600 hover:text-white transition flex gap-2 items-center justify-center text-sm"
                                            onClick={() => setShowEOIModal(true)}>
                                            <BookOpenCheck size={14} />
                                            <span>EOI Completed</span>
                                        </button>
                                        <button
                                            className="flex-1 px-4 sm:px-6 bg-green-100 text-green-700 font-semibold py-2 rounded-lg hover:bg-green-600 hover:text-white transition flex gap-2 items-center justify-center text-sm"
                                            onClick={() => setShowBookingModal(true)}>
                                            <CheckCircle size={14} />
                                            <span>Booking</span>
                                        </button>
                                        <button
                                            className="flex-1 px-4 sm:px-6 bg-red-100 text-red-700 font-semibold py-2 rounded-lg hover:bg-red-600 hover:text-white transition flex gap-2 items-center justify-center text-sm"
                                            onClick={() => setShowDeadLeadModal(true)}>
                                            <CircleX size={16} />
                                            <span>Mark Dead</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "info" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Name</label>
                                <p className="font-medium text-sm sm:text-base">{lead.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Mobile</label>
                                <p className="font-medium text-sm sm:text-base">{lead.mobile}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Project</label>
                                <p className="font-medium text-sm sm:text-base">{lead.project}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Source</label>
                                <p className="font-medium text-sm sm:text-base">{lead.source}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <p className="font-medium text-sm sm:text-base">{lead.status}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">City</label>
                                <p className="font-medium text-sm sm:text-base">{lead.city}</p>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-500">Initial Note</label>
                                <p className="font-medium text-sm sm:text-base">{lead.note}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "history" && (
                        <div className="space-y-3">
                            {lead.interactions.map((interaction, index) => {
                                const formatted = formatInteraction(interaction);
                                return (
                                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg bg-white shadow-sm">
                                        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-xs sm:text-sm">{formatted.icon}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                                <span className="font-medium text-gray-900 text-sm sm:text-base break-words">
                                                    {formatted.displayText}
                                                </span>
                                                <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                                                    {interaction.date} at {interaction.timestamp}
                                                </span>
                                            </div>
                                            {interaction.note && interaction.note !== formatted.displayText && (
                                                <p className="text-xs sm:text-sm text-gray-600 mt-1 break-words">
                                                    {interaction.note}
                                                </p>
                                            )}
                                            {interaction.noteType && (
                                                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mt-1">
                                                    {interaction.noteType.replace('_', ' ')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* All Modals */}
            {showCreateNoteModal && (
                <CreateNoteModal
                    lead={lead}
                    onClose={() => setShowCreateNoteModal(false)}
                    onSave={handleNoteSave}
                />
            )}

            {showFollowUpModal && (
                <FollowUpModal
                    lead={lead}
                    onClose={() => setShowFollowUpModal(false)}
                    onSave={handleFollowUpSave}
                />
            )}

            {showSiteVisitModal && (
                <SiteVisitModal
                    lead={lead}
                    onClose={() => setShowSiteVisitModal(false)}
                    onSave={handleSiteVisitSave}
                    onMarkComplete={handleSiteVisitComplete}
                />
            )}

            {showEOIModal && (
                <EOICompletionModal
                    lead={lead}
                    onClose={() => setShowEOIModal(false)}
                    onSave={handleEOISave}
                />
            )}

            {showBookingModal && (
                <BookingCompletionModal
                    lead={lead}
                    onClose={() => setShowBookingModal(false)}
                    onSave={handleBookingSave}
                />
            )}

            {showDeadLeadModal && (
                <DeadLeadModal
                    lead={lead}
                    onClose={() => setShowDeadLeadModal(false)}
                    onSave={handleDeadLeadSave}
                />
            )}

            {showWhatsAppModal && (
                <WhatsAppMessageModal
                    lead={lead}
                    onClose={() => setShowWhatsAppModal(false)}
                    onSend={handleWhatsAppSend}
                />
            )}
        </div>
    );
};

export default LeadDetailsModal;