import React, { useState } from "react";
import AllLeads from "./AllLeads";
import NewLeads from "./NewLeads";
import FollowUps from "./FollowUps";
import SiteVisits from "./SiteVisits";
import Bookings from "./Bookings";
import Dead from "./Dead";

const fakeData = [
  { id: 1, name: "John Doe", mobile: "9876543210", followupDate: "2025-09-18", project: "Skyline Residency", status: "", intent: "New Lead", note: "Interested in 2BHK", source: "Facebook Ads", city: "Bhubaneswar" },
  { id: 2, name: "Jane Smith", mobile: "9988776655", followupDate: "2025-09-20", project: "Green Valley", status: "", intent: "New Lead", note: "Requested brochure", source: "Website", city: "Cuttack" },
  { id: 3, name: "Mark Johnson", mobile: "9123456789", followupDate: "2025-09-22", project: "Riverfront Villas", status: "", intent: "New Lead", note: "Scheduled site visit", source: "Referral", city: "Pune" },
  { id: 4, name: "Alice Brown", mobile: "9786543210", followupDate: "2025-09-25", project: "Ocean Heights", status: "", intent: "New Lead", note: "Paid initial booking amount", source: "Google Ads", city: "Mumbai" },
  { id: 5, name: "Chris Evans", mobile: "9234567890", followupDate: "2025-09-28", project: "Hilltop Residency", status: "", intent: "New Lead", note: "Not interested anymore", source: "Walk-in", city: "Delhi" },
];

const statuses = ["All", "New", "FollowUps", "Site Visits", "Bookings/EOIs", "Dead"];

const LeadsManager = () => {
  const [leads, setLeads] = useState(fakeData);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [filterCity, setFilterCity] = useState("");

  // 🔎 Search
  const searchedLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.mobile.includes(searchQuery)
  );

  // ⬆ Sort
  const sortedLeads = [...searchedLeads].sort((a, b) =>
    a[sortKey]?.localeCompare(b[sortKey])
  );

  // 🎯 Filter
  const filteredLeads = filterCity
    ? sortedLeads.filter((lead) => lead.city === filterCity)
    : sortedLeads;

  const getCount = (status) => {
    if (status === "All") return filteredLeads.length;
    return filteredLeads.filter((lead) => lead.status === status).length;
  };

  const renderTab = () => {
    switch (activeTab) {
      case "All":
        return <AllLeads leads={filteredLeads} setLeads={setLeads} />;
      case "New":
        return <NewLeads leads={filteredLeads} setLeads={setLeads} />;
      case "FollowUps":
        return <FollowUps leads={filteredLeads} setLeads={setLeads} />;
      case "Site Visits":
        return <SiteVisits leads={filteredLeads} setLeads={setLeads} />;
      case "Bookings/EOIs":
        return <Bookings leads={filteredLeads} setLeads={setLeads} />;
      case "Dead":
        return <Dead leads={filteredLeads} setLeads={setLeads} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Leads Manager</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
          + Add Lead
        </button>
      </div>

      {/* 🔎 Search, Sort, Filter Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or mobile"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="name">Sort by Name</option>
          <option value="city">Sort by City</option>
          <option value="followupDate">Sort by Date</option>
        </select>

        <select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">Filter by City</option>
          <option value="Bhubaneswar">Bhubaneswar</option>
          <option value="Cuttack">Cuttack</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>
      </div>

      {/* 🏷️ Tabs */}
      <div className="bg-white rounded-md shadow p-4">
        <div className="flex flex-wrap space-x-8 border-b border-gray-200 mb-4">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`relative pb-3 text-base font-semibold focus:outline-none transition-colors
                ${
                  activeTab === status
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              style={{ minWidth: 80 }}
            >
              <span>{status}</span>
              <span
                className={`ml-1 text-xs font-normal ${
                  activeTab === status ? "text-blue-500" : "text-gray-400"
                }`}
              >
                ({getCount(status)})
              </span>
            </button>
          ))}
        </div>

        {/* Render active tab */}
        {renderTab()}
      </div>
    </div>
  );
};

export default LeadsManager;
