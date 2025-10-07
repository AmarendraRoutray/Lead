import React from 'react';
import { X, Download, Trash2, Eye, Edit, FileText, Image, Video, MessageSquare } from 'lucide-react';

const ViewTemplateModal = ({ template, onClose, onEdit, onDelete }) => {
  const getFileIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="text-red-500" size={20} />;
      case 'image': return <Image className="text-green-500" size={20} />;
      default: return <FileText className="text-blue-500" size={20} />;
    }
  };

  const getTemplateTypeBadge = (type) => {
    const typeConfig = {
      location: { color: 'bg-blue-100 text-blue-800', label: 'Location Template' },
      amenities: { color: 'bg-green-100 text-green-800', label: 'Amenities Template' },
      custom: { color: 'bg-purple-100 text-purple-800', label: 'Custom Template' }
    };
    
    const config = typeConfig[type] || { color: 'bg-gray-100 text-gray-800', label: type };
    return (
      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleDelete = () => {
    onDelete(template.id);
    onClose();
  };

  const handleEdit = () => {
    onEdit(template);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">Template Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <MessageSquare className="text-blue-500 mt-1" size={32} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
              <div className="flex items-center gap-3 mt-2">
                {getTemplateTypeBadge(template.type)}
                <span className="text-sm text-gray-500">• {template.projectName}</span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Created</label>
                <p className="text-sm text-gray-900 font-medium">{template.createdAt}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Last Updated</label>
                <p className="text-sm text-gray-900 font-medium">{template.updatedAt}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Project</label>
                <p className="text-sm text-gray-900 font-medium">{template.projectName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Template Type</label>
                <p className="text-sm text-gray-900 font-medium capitalize">{template.type}</p>
              </div>
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Message Caption</label>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-700 whitespace-pre-wrap">{template.caption}</p>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              <p>Personalization tags will be replaced with actual values when sending messages.</p>
            </div>
          </div>

          {/* Attachments */}
          {template.attachments && template.attachments.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Attachments</label>
              <div className="space-y-2">
                {template.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(attachment.type)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-xs text-gray-500 capitalize">
                          {attachment.type} • {attachment.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
                        title="Preview"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded transition-colors"
                        title="Download"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
              Delete Template
            </button>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Edit size={16} />
                Edit Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTemplateModal;