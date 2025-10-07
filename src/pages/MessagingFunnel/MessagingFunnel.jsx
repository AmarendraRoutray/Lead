import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, FileText, MessageSquare, X, Eye, Trash2, Replace } from 'lucide-react';
import TemplateModal from './TemplateModal';
import ViewTemplateModal from './ViewTemplateModal';

// Mock data
const mockProjects = [
    { id: '1', name: 'Project Alpha' },
    { id: '2', name: 'Project Beta' },
    { id: '3', name: 'Project Gamma' }
];

const mockTemplates = [
    {
        id: '1',
        name: 'Welcome Series - Location',
        caption: 'Hi <name>, welcome to <project_name>! Located in the heart of the city with excellent connectivity.',
        projectId: '1',
        projectName: 'Project Alpha',
        attachments: [
            {
                id: '1',
                name: 'location-map.jpg',
                type: 'image',
                url: '#',
                uploadDate: '2024-01-15'
            }
        ],
        type: 'location',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
    },
    {
        id: '2',
        name: 'Amenities Showcase',
        caption: 'Discover our world-class amenities at <project_name> including swimming pool, gym, and more!',
        projectId: '1',
        projectName: 'Project Alpha',
        attachments: [
            {
                id: '2',
                name: 'amenities-overview.jpg',
                type: 'image',
                url: '#',
                uploadDate: '2024-01-14'
            },
            {
                id: '3',
                name: 'pool-area.mp4',
                type: 'video',
                url: '#',
                uploadDate: '2024-01-14'
            }
        ],
        type: 'amenities',
        createdAt: '2024-01-14',
        updatedAt: '2024-01-14'
    },
    {
        id: '3',
        name: 'Project Beta Welcome',
        caption: 'Hello <name>, thank you for your interest in <project_name>!',
        projectId: '2',
        projectName: 'Project Beta',
        attachments: [],
        type: 'custom',
        createdAt: '2024-01-13',
        updatedAt: '2024-01-13'
    }
];

const templateTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'location', label: 'Location Template' },
    { value: 'amenities', label: 'Amenities Template' },
    { value: 'custom', label: 'Custom Template' }
];

const MessagingFunnel = () => {
    const [templates, setTemplates] = useState(mockTemplates);
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [editingTemplate, setEditingTemplate] = useState(null);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [projectFilter, setProjectFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    // Delete confirmation state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [templateToDelete, setTemplateToDelete] = useState(null);

    // Filter templates
    const filteredTemplates = useMemo(() => {
        return templates.filter(template => {
            const matchesSearch =
                template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.caption.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesProject = projectFilter === 'all' || template.projectId === projectFilter;
            const matchesType = typeFilter === 'all' || template.type === typeFilter;

            return matchesSearch && matchesProject && matchesType;
        });
    }, [templates, searchTerm, projectFilter, typeFilter]);

    const handleCreateTemplate = (templateData) => {
        const newTemplate = {
            ...templateData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0]
        };
        setTemplates([...templates, newTemplate]);
        setShowTemplateModal(false);
    };

    const handleUpdateTemplate = (templateData) => {
        setTemplates(templates.map(template =>
            template.id === templateData.id
                ? { ...templateData, updatedAt: new Date().toISOString().split('T')[0] }
                : template
        ));
        setEditingTemplate(null);
    };

    // Open delete confirmation modal
    const handleDeleteClick = (templateId) => {
        const template = templates.find(t => t.id === templateId);
        setTemplateToDelete(template);
        setShowDeleteModal(true);
    };

    // Confirm delete action
    const confirmDelete = () => {
        if (!templateToDelete) return;

        setTemplates(templates.filter(template => template.id !== templateToDelete.id));
        setShowDeleteModal(false);
        setTemplateToDelete(null);

        // Also close view modal if it's open
        if (selectedTemplate && selectedTemplate.id === templateToDelete.id) {
            setShowViewModal(false);
            setSelectedTemplate(null);
        }
    };

    // Cancel delete action
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setTemplateToDelete(null);
    };

    const handleViewTemplate = (template) => {
        setSelectedTemplate(template);
        setShowViewModal(true);
    };

    const handleEditTemplate = (template) => {
        setEditingTemplate(template);
        setShowTemplateModal(true);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setProjectFilter('all');
        setTypeFilter('all');
    };

    const hasActiveFilters = searchTerm || projectFilter !== 'all' || typeFilter !== 'all';

    const getTemplateTypeBadge = (type) => {
        const typeConfig = {
            location: { color: 'bg-blue-100 text-blue-800', label: 'Location' },
            amenities: { color: 'bg-green-100 text-green-800', label: 'Amenities' },
            custom: { color: 'bg-purple-100 text-purple-800', label: 'Custom' }
        };

        const config = typeConfig[type] || { color: 'bg-gray-100 text-gray-800', label: type };
        return (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const getAttachmentIcon = (type) => {
        switch (type) {
            case 'video': return <FileText className="text-red-500" size={16} />;
            case 'image': return <FileText className="text-green-500" size={16} />;
            case 'document': return <FileText className="text-blue-500" size={16} />;
            default: return <FileText className="text-gray-500" size={16} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Messaging Funnel</h1>
                        <p className="text-gray-600">Manage message templates for automated communication</p>
                    </div>
                    <button
                        onClick={() => setShowTemplateModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
                    >
                        <Plus size={20} />
                        Create Template
                    </button>
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
                                    placeholder="Search by template name or caption..."
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
                                value={projectFilter}
                                onChange={(e) => setProjectFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Projects</option>
                                {mockProjects.map(project => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {templateTypes.map(type => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
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
                                        Project
                                    </label>
                                    <select
                                        value={projectFilter}
                                        onChange={(e) => setProjectFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">All Projects</option>
                                        {mockProjects.map(project => (
                                            <option key={project.id} value={project.id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Template Type
                                    </label>
                                    <select
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {templateTypes.map(type => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
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
                        Showing {filteredTemplates.length} of {templates.length} templates
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

                {/* Templates Grid */}
                <div className="bg-white rounded-lg shadow border border-gray-200">
                    {filteredTemplates.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-2">
                                <MessageSquare size={48} className="mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No templates found</h3>
                            <p className="text-gray-500 mb-4">
                                {hasActiveFilters
                                    ? 'Try adjusting your filters or search terms'
                                    : 'No message templates have been created yet'
                                }
                            </p>
                            {hasActiveFilters ? (
                                <button
                                    onClick={clearFilters}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Clear all filters
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowTemplateModal(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Create Your First Template
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {filteredTemplates.map((template) => (
                                <div key={template.id} className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <MessageSquare className="text-blue-500" size={20} />
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-sm">
                                                    {template.name}
                                                </h3>
                                                <p className="text-xs text-gray-500">{template.projectName}</p>
                                            </div>
                                        </div>
                                        {getTemplateTypeBadge(template.type)}
                                    </div>

                                    {/* Caption Preview */}
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 line-clamp-3">
                                            {template.caption}
                                        </p>
                                    </div>

                                    {/* Attachments */}
                                    {template.attachments && template.attachments.length > 0 && (
                                        <div className="mb-4">
                                            <p className="text-xs text-gray-500 font-medium mb-2">Attachments:</p>
                                            <div className="space-y-1">
                                                {template.attachments.slice(0, 3).map((attachment) => (
                                                    <div key={attachment.id} className="flex items-center gap-2 text-xs text-gray-600">
                                                        {getAttachmentIcon(attachment.type)}
                                                        <span className="truncate flex-1">{attachment.name}</span>
                                                    </div>
                                                ))}
                                                {template.attachments.length > 3 && (
                                                    <p className="text-xs text-gray-500">
                                                        +{template.attachments.length - 3} more files
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Metadata */}
                                    <div className="text-xs text-gray-500 space-y-1 mb-4">
                                        <div className="flex justify-between">
                                            <span>Created:</span>
                                            <span>{template.createdAt}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Updated:</span>
                                            <span>{template.updatedAt}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewTemplate(template)}
                                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
                                                title="View Template"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEditTemplate(template)}
                                                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                                                title="Edit Template"
                                            >
                                                <Replace size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteClick(template.id)}
                                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                                            title="Delete Template"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && templateToDelete && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                        <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-auto">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <Trash2 className="text-red-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Delete Template
                                    </h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        This action cannot be undone
                                    </p>
                                </div>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                                <p className="text-sm text-red-800 font-medium">
                                    {templateToDelete.name}
                                </p>
                                <p className="text-xs text-red-600 mt-1">
                                    {templateToDelete.projectName} • {templateToDelete.type}
                                </p>
                            </div>

                            <p className="text-gray-600 mb-6 text-sm">
                                Are you sure you want to delete this template? This will permanently remove it from the system.
                            </p>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={cancelDelete}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                                >
                                    Delete Template
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modals */}
                {showTemplateModal && (
                    <TemplateModal
                        onClose={() => {
                            setShowTemplateModal(false);
                            setEditingTemplate(null);
                        }}
                        onSave={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}
                        mode={editingTemplate ? 'edit' : 'create'}
                        template={editingTemplate}
                        projects={mockProjects}
                    />
                )}

                {showViewModal && selectedTemplate && (
                    <ViewTemplateModal
                        template={selectedTemplate}
                        onClose={() => setShowViewModal(false)}
                        onEdit={handleEditTemplate}
                        onDelete={handleDeleteClick}
                    />
                )}
            </div>
        </div>
    );
};

export default MessagingFunnel;