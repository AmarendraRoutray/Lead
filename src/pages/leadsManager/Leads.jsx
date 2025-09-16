import React, { useState } from "react";


const statusOptions = [
    "In Progress",
    "SV Scheduled",
    "SV Completed",
    "EOI Completed",
    "Booking Completed",
    "Dead Lead",
];

const intentOptions = [
    { label: "New Lead", color: "bg-blue-500" },
    { label: "Hot Lead", color: "bg-green-500" },
    { label: "Cold Lead", color: "bg-sky-500" },
    { label: "Warm Lead", color: "bg-orange-400" },
];

const fakeData = [
    { id: 1, name: "John Doe", mobile: "9876543210", followupDate: "2025-09-18", project: "Skyline Residency", status: "", intent: "New Lead", note: "Interested in 2BHK", source: "Facebook Ads", city: "Bhubaneswar" },
    { id: 2, name: "Jane Smith", mobile: "9988776655", followupDate: "2025-09-20", project: "Green Valley", status: "", intent: "New Lead", note: "Requested brochure", source: "Website", city: "Cuttack" },
    { id: 3, name: "Mark Johnson", mobile: "9123456789", followupDate: "2025-09-22", project: "Riverfront Villas", status: "", intent: "New Lead", note: "Scheduled site visit", source: "Referral", city: "Pune" },
    { id: 4, name: "Alice Brown", mobile: "9786543210", followupDate: "2025-09-25", project: "Ocean Heights", status: "", intent: "New Lead", note: "Paid initial booking amount", source: "Google Ads", city: "Mumbai" },
    { id: 5, name: "Chris Evans", mobile: "9234567890", followupDate: "2025-09-28", project: "Hilltop Residency", status: "", intent: "New Lead", note: "Not interested anymore", source: "Walk-in", city: "Delhi", },
]

const LeadsManager = () => {
    const [leads] = useState(fakeData);
    const [activeTab, setActiveTab] = useState("All");

    const handleStatusChange = (id, value) => {
        setLeads((prev) =>
            prev.map((lead) =>
                lead.id === id ? { ...lead, status: value } : lead
            )
        );
    };

    const handleIntentChange = (id, value) => {
        setLeads((prev) =>
            prev.map((lead) =>
                lead.id === id ? { ...lead, intent: value } : lead
            )
        );
    };


    const statuses = ["All", "New", "FollowUps", "Site Visits", "Bookings/EOIs", "Dead"];

    // Count logic
    const getCount = (status) => {
        if (status === "All") return leads.length;
        return leads.filter((lead) => lead.status === status).length;
    };

    const filteredLeads = activeTab === "All" ? leads : leads.filter((lead) => lead.status === activeTab);

    return (
        <div className="p-4 md:p-6">
            <div className="flex items-center mb-4 gap-3">
                <h1 className="text-2xl font-bold">Leads Manager</h1>
                <span className="text-xs text-gray-500">
                    Last Updated: 4:56 pm, 3rd Nov 23&nbsp; 
                    <button className="text-blue-500 underline ml-1">refresh</button>
                </span>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-md shadow p-4">
                {/* <div className="flex flex-wrap gap-2 mb-4">
                    {statuses.map((status) => (
                        <button
                            key={status}
                            onClick={() => setActiveTab(status)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition 
                ${activeTab === status
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {status}
                            <span className="ml-1 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                                {getCount(status)}
                            </span>
                        </button>
                    ))}
                </div> */}

                <div className="flex space-x-8 border-b border-gray-200 mb-4">
                    {statuses.map((status) => (
                        <button
                            key={status}
                            onClick={() => setActiveTab(status)}
                            className={`relative pb-3 text-base font-semibold focus:outline-none transition-colors
                                ${activeTab === status
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-600 hover:text-blue-500"
                                }`}
                            style={{ minWidth: 80 }}
                        >
                            <span>{status}</span>
                            <span className={`ml-1 text-xs font-normal
                                ${activeTab === status
                                    ? "text-blue-500"
                                    : "text-gray-400"
                                }`}>
                                ({getCount(status)})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="px-4 py-2 font-semibold">Sl.No</th>
                                <th className="px-4 py-2 font-semibold">Name</th>
                                <th className="px-4 py-2 font-semibold">Mobile No.</th>
                                <th className="px-4 py-2 font-semibold">Followup Date</th>
                                <th className="px-4 py-2 font-semibold">Project</th>
                                <th className="px-4 py-2 font-semibold">Status</th>
                                <th className="px-4 py-2 font-semibold">Intent</th>
                                <th className="px-4 py-2 font-semibold">Note</th>
                                <th className="px-4 py-2 font-semibold">Source</th>
                                <th className="px-4 py-2 font-semibold">City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.map((lead, index) => (
                                <tr key={lead.id} className="border-b last:border-0">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{lead.name}</td>
                                    <td className="px-4 py-2">{lead.mobile}</td>
                                    <td className="px-4 py-2">{lead.followupDate}</td>
                                    <td className="px-4 py-2">{lead.project}</td>

                                    {/* Status Dropdown */}
                                    <td className="px-4 py-2">
                                        <select
                                            value={lead.status}
                                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                            className="border rounded px-2 py-1 text-sm"
                                        >
                                            <option value="">Select</option>
                                            {statusOptions.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    </td>

                                    {/* Intent Dropdown */}
                                    <td className="px-4 py-2">
                                        <select
                                            value={lead.intent}
                                            onChange={(e) => handleIntentChange(lead.id, e.target.value)}
                                            className={`border rounded px-2 py-1 text-xs text-white
                                                ${intentOptions.find((opt) => opt.label === lead.intent)?.color || "bg-blue-500"}`
                                            }
                                        >
                                            {intentOptions.map((opt) => (
                                                <option
                                                    key={opt.label}
                                                    value={opt.label}
                                                    className="text-black bg-white"
                                                >
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>


                                    <td className="px-4 py-2">{lead.note}</td>
                                    <td className="px-4 py-2">{lead.source}</td>
                                    <td className="px-4 py-2">{lead.city}</td>
                                </tr>
                            ))}
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeadsManager;
