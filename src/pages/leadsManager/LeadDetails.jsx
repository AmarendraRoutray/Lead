import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Edit2, Calendar, MapPin, FileText } from "lucide-react";
import BackButton from "../../components/BackButton";
import CustomerInfo from "./CustomerInfo";
import OtherInfo from "./OtherInfo";

const LeadDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const lead = location.state?.lead;

  const [activeTab, setActiveTab] = useState("Overview");

  if (!lead) return <div className="p-8">No lead data available</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton label="Back to Leads" to="/leads-manager" className="mb-4" />

      <div className="max-w-7xl mx-auto bg-white rounded-md shadow p-6 flex gap-6">
        {/* LEFT MAIN CONTENT */}
        <div className="flex-1 min-w-[400px]">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold">{lead.name}</h1>
            <select className="px-3 py-1 rounded border text-sm" value={lead.status} disabled>
              <option>EOI Completed</option>
              <option>Booking Completed</option>
            </select>
            <span className="px-4 py-1 bg-green-600 text-white text-xs rounded">{lead.intent}</span>
          </div>

          {/* Tabs */}
          <nav className="mb-6 border-b flex gap-8 text-gray-600">
            {["Overview", "Customer Info", "Other Info"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 border-b-2 font-semibold ${
                  activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent hover:border-blue-400 hover:text-blue-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Tab Content */}
          {activeTab === "Overview" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-gray-700">
              <div>
                <div className="text-gray-400 mb-1">Mobile</div>
                <div>{lead.mobile}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Email</div>
                <div>{lead.email || "-"}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Project</div>
                <div>{lead.project}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Budget</div>
                <div className="flex items-center gap-2">
                  {lead.budget || "-"} <Edit2 className="text-gray-400 cursor-pointer" size={16} />
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Source</div>
                <div>{lead.source}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Created Date</div>
                <div>{lead.createdDate || "-"}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Preferred Location</div>
                <div>{lead.preferredLocation || "-"}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Alt Mobile No</div>
                <div>{lead.altMobile || "-"}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Possession Preference</div>
                <div>{lead.possessionPreference || "-"}</div>
              </div>
            </div>
          )}
          {activeTab === "Customer Info" && <CustomerInfo customerInfo={lead.customerInfo} />}
          {activeTab === "Other Info" && <OtherInfo otherInfo={lead.otherInfo} />}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-80 bg-gray-100 p-4 rounded h-fit">
          <button className="flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded shadow text-gray-700 hover:bg-gray-200 transition">
            <FileText size={20} /> Create Note
          </button>
          <button className="flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded shadow text-gray-700 hover:bg-gray-200 transition">
            <Calendar size={20} /> Followups
          </button>
          <button className="flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded shadow text-gray-700 hover:bg-gray-200 transition">
            <MapPin size={20} /> Site Visit
          </button>

          <section className="mt-5 bg-orange-50 rounded p-3">
            <h3 className="text-gray-600 font-semibold mb-2 text-sm">Recent Activities</h3>
            {!lead.activities?.length && <p className="text-gray-500 text-xs">No recent activities</p>}
            {lead.activities?.map((act, idx) => (
              <div key={idx} className="text-xs mb-3">
                <div>{act.title}</div>
                <div className="text-gray-500">{act.project} | {act.source}</div>
                <div className="text-gray-400 text-[10px]">{act.date}</div>
              </div>
            ))}
          </section>
        </aside>
      </div>
    </div>
  );
};

export default LeadDetails;
