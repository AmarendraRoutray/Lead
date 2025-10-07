import React, { useState, useMemo } from 'react';
import { Plus, Edit2, Trash2, Eye, Search, Filter, X, UserRoundX, UserRoundCheck } from 'lucide-react';
import AddEditMemberModal from './AddEditMemberModal';
import ReportModal from './ReportModal';

// Mock data - replace with actual API calls
const mockTeamMembers = [
  {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastActive: '2024-01-15 14:30:00',
    joinDate: '2023-01-01'
  },
  {
    id: '2',
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    role: 'manager',
    status: 'active',
    lastActive: '2024-01-14 10:15:00',
    joinDate: '2023-02-15'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    username: 'mikej',
    email: 'mike@example.com',
    role: 'agent',
    status: 'inactive',
    lastActive: '2024-01-10 09:45:00',
    joinDate: '2023-03-20'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    username: 'sarahw',
    email: 'sarah@example.com',
    role: 'agent',
    status: 'active',
    lastActive: '2024-01-16 08:20:00',
    joinDate: '2023-04-10'
  },
  {
    id: '5',
    name: 'David Brown',
    username: 'davidb',
    email: 'david@example.com',
    role: 'manager',
    status: 'inactive',
    lastActive: '2024-01-08 16:45:00',
    joinDate: '2023-05-15'
  }
];

const mockReports = {
  '1': {
    ...mockTeamMembers[0],
    metrics: {
      leadsAssigned: 150,
      siteVisits: 45,
      dealsClosed: 12,
      conversionRate: 8.0
    }
  },
  '2': {
    ...mockTeamMembers[1],
    metrics: {
      leadsAssigned: 200,
      siteVisits: 60,
      dealsClosed: 18,
      conversionRate: 9.0
    }
  },
  '3': {
    ...mockTeamMembers[2],
    metrics: {
      leadsAssigned: 80,
      siteVisits: 25,
      dealsClosed: 6,
      conversionRate: 7.5
    }
  },
  '4': {
    ...mockTeamMembers[3],
    metrics: {
      leadsAssigned: 120,
      siteVisits: 35,
      dealsClosed: 10,
      conversionRate: 8.3
    }
  },
  '5': {
    ...mockTeamMembers[4],
    metrics: {
      leadsAssigned: 90,
      siteVisits: 28,
      dealsClosed: 7,
      conversionRate: 7.8
    }
  }
};

// Format date function
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

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter team members based on search and filters
  const filteredTeamMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesSearch = 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = roleFilter === 'all' || member.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [teamMembers, searchTerm, roleFilter, statusFilter]);

  const handleAddMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().replace('T', ' ').split('.')[0]
    };
    setTeamMembers([...teamMembers, newMember]);
    setShowAddModal(false);
  };

  const handleEditMember = (memberData) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === memberData.id ? memberData : member
    ));
    setEditingMember(null);
  };

  const handleDeactivate = (id) => {
    setTeamMembers(teamMembers.map(member =>
      member.id === id ? { ...member, status: 'inactive' } : member
    ));
  };

  const handleActivate = (id) => {
    setTeamMembers(teamMembers.map(member =>
      member.id === id ? { ...member, status: 'active' } : member
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  const handleViewReport = (member) => {
    setSelectedMember(member);
    setShowReportModal(true);
  };

  const exportToCSV = (memberId) => {
    const report = mockReports[memberId];
    if (!report) return;

    const csvContent = [
      ['Metric', 'Value'],
      ['Name', report.name],
      ['Username', report.username],
      ['Role', report.role],
      ['Leads Assigned', report.metrics.leadsAssigned],
      ['Site Visits', report.metrics.siteVisits],
      ['Deals Closed', report.metrics.dealsClosed],
      ['Conversion Rate', `${report.metrics.conversionRate}%`],
      ['Last Active', formatLastActive(report.lastActive)]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.username}_report.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = (memberId) => {
    const report = mockReports[memberId];
    if (!report) return;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${report.name} Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
              .metric { margin: 15px 0; padding: 10px; background: #f8f9fa; border-radius: 5px; }
              .value { font-weight: bold; color: #1f2937; }
              .metrics { margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Performance Report</h1>
              <h2>${report.name} (${report.role})</h2>
              <p>Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="metrics">
              <div class="metric">Leads Assigned: <span class="value">${report.metrics.leadsAssigned}</span></div>
              <div class="metric">Site Visits: <span class="value">${report.metrics.siteVisits}</span></div>
              <div class="metric">Deals Closed: <span class="value">${report.metrics.dealsClosed}</span></div>
              <div class="metric">Conversion Rate: <span class="value">${report.metrics.conversionRate}%</span></div>
              <div class="metric">Last Active: <span class="value">${formatLastActive(report.lastActive)}</span></div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-yellow-100 text-yellow-800';
      case 'agent': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setStatusFilter('all');
  };

  const hasActiveFilters = searchTerm || roleFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600">Manage your team members and their permissions</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus size={20} />
            Add
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Total Members</h3>
            <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Active</h3>
            <p className="text-2xl font-bold text-green-600">
              {teamMembers.filter(m => m.status === 'active').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Admins</h3>
            <p className="text-2xl font-bold text-blue-600">
              {teamMembers.filter(m => m.role === 'admin').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Agents</h3>
            <p className="text-2xl font-bold text-purple-600">
              {teamMembers.filter(m => m.role === 'agent').length}
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, username, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Toggle Button for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} />
              Filters
              {hasActiveFilters && (
                <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            {/* Filter Controls - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="agent">Agent</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filter Controls */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-700">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="agent">Agent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg"
                  >
                    <X size={16} />
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredTeamMembers.length} of {teamMembers.length} team members
            {hasActiveFilters && ' (filtered)'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <X size={16} />
              Clear filters
            </button>
          )}
        </div>

        {/* Team Members Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          {filteredTeamMembers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No team members found</h3>
              <p className="text-gray-500 mb-4">
                {hasActiveFilters 
                  ? 'Try adjusting your filters or search terms'
                  : 'No team members have been added yet'
                }
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTeamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {member.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {member.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(member.role)}`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(member.status)}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatLastActive(member.lastActive)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewReport(member)}
                            className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded"
                            title="View Reports"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => setEditingMember(member)}
                            className="text-gray-600 hover:text-gray-900 transition-colors p-1 rounded"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          {member.status === 'active' ? (
                            <button
                              onClick={() => handleDeactivate(member.id)}
                              className="text-yellow-600 hover:text-yellow-900 transition-colors p-1 rounded"
                              title="Deactivate"
                            >
                              <UserRoundX size={16} />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleActivate(member.id)}
                              className="text-green-600 hover:text-green-900 transition-colors p-1 rounded"
                              title="Activate"
                            >
                              <UserRoundCheck size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modals */}
        {showAddModal && (
          <AddEditMemberModal
            onClose={() => setShowAddModal(false)}
            onSave={handleAddMember}
            mode="add"
          />
        )}

        {editingMember && (
          <AddEditMemberModal
            onClose={() => setEditingMember(null)}
            onSave={handleEditMember}
            mode="edit"
            member={editingMember}
          />
        )}

        {showReportModal && selectedMember && (
          <ReportModal
            member={selectedMember}
            report={mockReports[selectedMember.id]}
            onClose={() => setShowReportModal(false)}
            onExportCSV={exportToCSV}
            onExportPDF={exportToPDF}
          />
        )}
      </div>
    </div>
  );
};

export default TeamManagement;