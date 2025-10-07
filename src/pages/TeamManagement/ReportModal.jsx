import React from 'react';
import { X, Download, FileText } from 'lucide-react';

// Format date function (same as above)
const formatLastActive = (dateTimeString) => {
  if (!dateTimeString) return 'Never';
  
  try {
    const date = new Date(dateTimeString.replace(' ', 'T'));
    
    // Format date: 15-Jan-24
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    
    // Format time: 2:30pm
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    return `${day}-${month}-${year} ${hours}:${minutes}${ampm}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

const ReportModal = ({ member, report, onClose, onExportCSV, onExportPDF }) => {
  if (!report) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">No Data Available</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-600">No performance data available for this team member.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Performance Report</h2>
            <p className="text-gray-600">{member.name} ({member.role})</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">{report.metrics.leadsAssigned}</div>
              <div className="text-sm text-blue-800 font-medium">Leads Assigned</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center border border-green-100">
              <div className="text-2xl font-bold text-green-600">{report.metrics.siteVisits}</div>
              <div className="text-sm text-green-800 font-medium">Site Visits</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center border border-purple-100">
              <div className="text-2xl font-bold text-purple-600">{report.metrics.dealsClosed}</div>
              <div className="text-sm text-purple-800 font-medium">Deals Closed</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-100">
              <div className="text-2xl font-bold text-orange-600">{report.metrics.conversionRate}%</div>
              <div className="text-sm text-orange-800 font-medium">Conversion Rate</div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
            <h3 className="font-semibold mb-3 text-gray-800">Member Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Username</label>
                <p className="font-medium text-gray-900">{member.username}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Email</label>
                <p className="font-medium text-gray-900">{member.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Role</label>
                <p className="font-medium text-gray-900 capitalize">{member.role}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Last Active</label>
                <p className="font-medium text-gray-900">{formatLastActive(member.lastActive)}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Status</label>
                <p className="font-medium text-gray-900 capitalize">{member.status}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Join Date</label>
                <p className="font-medium text-gray-900">{member.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3 text-gray-800">Export Report</h3>
            <div className="flex gap-3">
              <button
                onClick={() => onExportCSV(member.id)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                <Download size={16} />
                Export CSV
              </button>
              <button
                onClick={() => onExportPDF(member.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                <FileText size={16} />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;