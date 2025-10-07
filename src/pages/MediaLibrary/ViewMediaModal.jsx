import React from 'react';
import { X, Download, Trash2, ExternalLink, Video, Image, File } from 'lucide-react';

const ViewMediaModal = ({ media, onClose, onDownload, onDelete }) => {
    const getFileIcon = (type) => {
        switch (type) {
            case 'video': return <Video size={32} className="text-red-500" />;
            case 'document': return <File size={32} className="text-blue-500" />;
            default: return <Image size={32} className="text-green-500" />;
        }
    };

    const getTypeLabel = (type) => {
        const labels = {
            video: 'Video',
            document: 'Document',
            '3d_photos': '3D Photos',
            'real_photos': 'Real Photos',
            'funnel_creatives': 'Funnel Creatives'
        };
        return labels[type] || type;
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this media file?')) {
            onDelete(media.id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
                    <h2 className="text-xl font-semibold">Media Details</h2>
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
                        {getFileIcon(media.type)}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{media.title}</h3>
                            <p className="text-gray-500">{media.name}</p>
                            <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${media.type === 'video' ? 'bg-red-100 text-red-800' :
                                    media.type === 'document' ? 'bg-blue-100 text-blue-800' :
                                        'bg-green-100 text-green-800'
                                }`}>
                                {getTypeLabel(media.type)}
                            </span>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Project</label>
                                <p className="text-sm text-gray-900 font-medium">{media.projectName}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Upload Date</label>
                                <p className="text-sm text-gray-900 font-medium">{media.uploadDate}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">File Size</label>
                                <p className="text-sm text-gray-900 font-medium">{media.size}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">File Type</label>
                                <p className="text-sm text-gray-900 font-medium">{getTypeLabel(media.type)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">File Name</label>
                                <p className="text-sm text-gray-900 font-medium break-all">{media.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Video Links */}
                    {media.type === 'video' && (media.youtubeLink || media.vimeoLink) && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-900 mb-3">Video Links</h4>
                            <div className="space-y-2">
                                {media.youtubeLink && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-blue-800">YouTube</span>
                                        <a
                                            href={media.youtubeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Open Link
                                            <ExternalLink size={14} />
                                        </a>
                                    </div>
                                )}
                                {media.vimeoLink && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-blue-800">Vimeo</span>
                                        <a
                                            href={media.vimeoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Open Link
                                            <ExternalLink size={14} />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* File Preview Placeholder */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <div className="text-gray-400 mb-2">
                            {getFileIcon(media.type)}
                        </div>
                        <p className="text-sm text-gray-600">
                            {media.type === 'video' ? 'Video preview would be displayed here' :
                                media.type === 'document' ? 'Document preview would be displayed here' :
                                    'Image preview would be displayed here'}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t">
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 size={16} />
                            Delete File
                        </button>

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => onDownload(media)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                <Download size={16} />
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewMediaModal;