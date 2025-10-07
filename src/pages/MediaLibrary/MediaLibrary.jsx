import React, { useState, useMemo } from 'react';
import { Plus, Download, Trash2, Eye, Filter, Search, Video, Image, File, X } from 'lucide-react';
import UploadMediaModal from './UploadMediaModal';
import ViewMediaModal from './ViewMediaModal';

// Mock data
const mockProjects = [
  { id: '1', name: 'Project Alpha' },
  { id: '2', name: 'Project Beta' },
  { id: '3', name: 'Project Gamma' }
];

const mockMediaFiles = [
  {
    id: '1',
    name: 'project-overview.mp4',
    type: 'video',
    projectId: '1',
    projectName: 'Project Alpha',
    title: 'Project Overview Video',
    youtubeLink: 'https://youtube.com/watch?v=abc123',
    uploadDate: '2024-01-15',
    size: '45.2 MB',
    url: '#'
  },
  {
    id: '2',
    name: 'layout-plan.pdf',
    type: 'document',
    projectId: '1',
    projectName: 'Project Alpha',
    title: 'Layout Plan Document',
    uploadDate: '2024-01-14',
    size: '12.5 MB',
    url: '#'
  },
  {
    id: '3',
    name: '3d-rendering-1.jpg',
    type: '3d_photos',
    projectId: '2',
    projectName: 'Project Beta',
    title: '3D Rendering View 1',
    uploadDate: '2024-01-13',
    size: '8.7 MB',
    url: '#'
  },
  {
    id: '4',
    name: 'real-photo-1.jpg',
    type: 'real_photos',
    projectId: '3',
    projectName: 'Project Gamma',
    title: 'Site Progress Photo',
    uploadDate: '2024-01-12',
    size: '6.3 MB',
    url: '#'
  },
  {
    id: '5',
    name: 'funnel-creative-1.png',
    type: 'funnel_creatives',
    projectId: '1',
    projectName: 'Project Alpha',
    title: 'Social Media Ad Creative',
    uploadDate: '2024-01-11',
    size: '4.1 MB',
    url: '#'
  }
];

const fileTypes = [
  { value: 'all', label: 'All Types', icon: File },
  { value: 'video', label: 'Videos', icon: Video },
  { value: 'document', label: 'Documents', icon: File },
  { value: '3d_photos', label: '3D Photos', icon: Image },
  { value: 'real_photos', label: 'Real Photos', icon: Image },
  { value: 'funnel_creatives', label: 'Funnel Creatives', icon: Image }
];

const MediaLibrary = () => {
  const [mediaFiles, setMediaFiles] = useState(mockMediaFiles);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredMediaFiles = useMemo(() => {
    return mediaFiles.filter(file => {
      const matchesSearch =
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.projectName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesProject = projectFilter === 'all' || file.projectId === projectFilter;
      const matchesType = typeFilter === 'all' || file.type === typeFilter;

      return matchesSearch && matchesProject && matchesType;
    });
  }, [mediaFiles, searchTerm, projectFilter, typeFilter]);

  const handleUploadMedia = (mediaData) => {
    const newMedia = {
      ...mediaData,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString().split('T')[0],
      size: '0 MB'
    };
    setMediaFiles([...mediaFiles, newMedia]);
    setShowUploadModal(false);
  };

  const handleDeleteClick = (mediaId) => {
    const media = mediaFiles.find(file => file.id === mediaId);
    setMediaToDelete(media);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!mediaToDelete) return;
    
    setIsDeleting(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMediaFiles(mediaFiles.filter(file => file.id !== mediaToDelete.id));
      setShowDeleteModal(false);
      setMediaToDelete(null);
    } catch (error) {
      console.error('Error deleting media:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Cancel delete action
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setMediaToDelete(null);
    setIsDeleting(false);
  };

  const handleViewMedia = (media) => {
    setSelectedMedia(media);
    setShowViewModal(true);
  };

  const handleDownload = (media) => {
    // In real implementation, this would trigger actual file download
    console.log('Downloading:', media.name);
    // Create a temporary link for download
    const link = document.createElement('a');
    link.href = media.url;
    link.download = media.name;
    link.click();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setProjectFilter('all');
    setTypeFilter('all');
  };

  const hasActiveFilters = searchTerm || projectFilter !== 'all' || typeFilter !== 'all';

  const getFileIcon = (type) => {
    switch (type) {
      case 'video': return <Video size={20} className="text-red-500" />;
      case 'document': return <File size={20} className="text-blue-500" />;
      case '3d_photos':
      case 'real_photos':
      case 'funnel_creatives':
        return <Image size={20} className="text-green-500" />;
      default: return <File size={20} className="text-gray-500" />;
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'document': return 'bg-blue-100 text-blue-800';
      case '3d_photos': return 'bg-purple-100 text-purple-800';
      case 'real_photos': return 'bg-green-100 text-green-800';
      case 'funnel_creatives': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type) => {
    return fileTypes.find(t => t.value === type)?.label || type;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
            <p className="text-gray-600">Upload and manage all project-related media files</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus size={20} />
            Upload Files
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
                  placeholder="Search by file name, title, or project..."
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
                {fileTypes.map(type => (
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
                    File Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {fileTypes.map(type => (
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
            Showing {filteredMediaFiles.length} of {mediaFiles.length} files
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

        {/* Media Files Grid */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          {filteredMediaFiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <File size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No media files found</h3>
              <p className="text-gray-500 mb-4">
                {hasActiveFilters
                  ? 'Try adjusting your filters or search terms'
                  : 'No media files have been uploaded yet'
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
                  onClick={() => setShowUploadModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Your First File
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filteredMediaFiles.map((file) => (
                <div key={file.id} className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.type)}
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm truncate max-w-32">
                          {file.title}
                        </h3>
                        <p className="text-xs text-gray-500">{file.name}</p>
                      </div>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadgeColor(file.type)}`}>
                      {getTypeLabel(file.type)}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Project:</span>
                      <span className="font-medium">{file.projectName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uploaded:</span>
                      <span className="font-medium">{file.uploadDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="font-medium">{file.size}</span>
                    </div>
                  </div>

                  {file.type === 'video' && (
                    <div className="mb-4 p-2 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-blue-800">
                        <strong>YouTube:</strong> {file.youtubeLink || 'Not provided'}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewMedia(file)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDownload(file)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded transition-colors"
                        title="Download"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDeleteClick(file.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                      title="Delete"
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
        {showDeleteModal && mediaToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Trash2 className="text-red-600" size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Delete Media File
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-800 font-medium">
                  {mediaToDelete.title}
                </p>
                <p className="text-xs text-red-600 mt-1">
                  {mediaToDelete.name} • {mediaToDelete.projectName}
                </p>
              </div>

              <p className="text-gray-600 mb-6 text-sm">
                Are you sure you want to delete this media file? This will permanently remove it from the system.
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        {showUploadModal && (
          <UploadMediaModal
            onClose={() => setShowUploadModal(false)}
            onSave={handleUploadMedia}
            projects={mockProjects}
          />
        )}

        {showViewModal && selectedMedia && (
          <ViewMediaModal
            media={selectedMedia}
            onClose={() => setShowViewModal(false)}
            onDownload={handleDownload}
            onDelete={handleDeleteClick}
          />
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;