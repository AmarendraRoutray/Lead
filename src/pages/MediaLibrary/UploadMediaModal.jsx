import React, { useState } from 'react';
import { X, Upload, Video, Image, File } from 'lucide-react';

const UploadMediaModal = ({ onClose, onSave, projects }) => {
    const [formData, setFormData] = useState({
        projectId: '',
        fileType: '',
        title: '',
        youtubeLink: '',
        files: []
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fileTypes = [
        { value: 'video', label: 'Video', icon: Video, multiple: false },
        { value: 'document', label: 'Document', icon: File, multiple: false },
        { value: '3d_photos', label: '3D Photos', icon: Image, multiple: true },
        { value: 'real_photos', label: 'Real Photos', icon: Image, multiple: true },
        { value: 'funnel_creatives', label: 'Funnel Creatives', icon: Image, multiple: true }
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.projectId) newErrors.projectId = 'Project is required';
        if (!formData.fileType) newErrors.fileType = 'File type is required';
        if (!formData.title.trim()) newErrors.title = 'Title is required';

        if (formData.fileType === 'video') {
            if (!formData.youtubeLink) {
                newErrors.youtubeLink = 'YouTube link is required for videos';
            }
        }

        if (formData.files.length === 0) {
            newErrors.files = 'At least one file is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // In real implementation, you would upload files to server here
            const mediaData = {
                ...formData,
                name: formData.files[0]?.name || 'Unknown File',
                projectName: projects.find(p => p.id === formData.projectId)?.name || 'Unknown Project'
            };

            await onSave(mediaData);
        } catch (error) {
            console.error('Error uploading media:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            files
        }));
        if (errors.files) setErrors(prev => ({ ...prev, files: '' }));
    };

    const getSelectedFileType = () => {
        return fileTypes.find(type => type.value === formData.fileType);
    };

    const isVideoType = formData.fileType === 'video';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
                    <h2 className="text-xl font-semibold">Upload Media Files</h2>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Project Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project *
                        </label>
                        <select
                            name="projectId"
                            value={formData.projectId}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select a project</option>
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                        {errors.projectId && (
                            <p className="mt-1 text-sm text-red-600">{errors.projectId}</p>
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            placeholder="Enter media title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                        )}
                    </div>

                    {/* File Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            File Type *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {fileTypes.map(type => (
                                <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, fileType: type.value }));
                                        if (errors.fileType) setErrors(prev => ({ ...prev, fileType: '' }));
                                    }}
                                    disabled={isLoading}
                                    className={`p-1 border-2 rounded-lg text-center transition-all ${formData.fileType === type.value
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                                        } disabled:opacity-50`}
                                >
                                    <type.icon size={24} className="mx-auto mb-2" />
                                    <div className="text-sm font-medium">{type.label}</div>
                                    {type.multiple && (
                                        <div className="text-xs text-gray-500 mt-1">Multiple files</div>
                                    )}
                                </button>
                            ))}
                        </div>
                        {errors.fileType && (
                            <p className="mt-1 text-sm text-red-600">{errors.fileType}</p>
                        )}
                    </div>

                    {/* Video Links - Only for video type */}
                    {isVideoType && (
                        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h3 className="font-medium text-blue-900">Video Links</h3>

                            <div>
                                <label className="block text-sm font-medium text-blue-700 mb-2">
                                    YouTube Link
                                </label>
                                <input
                                    type="url"
                                    name="youtubeLink"
                                    value={formData.youtubeLink}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {errors.youtubeLink && (
                                <p className="text-sm text-red-600">{errors.youtubeLink}</p>
                            )}
                        </div>
                    )}

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {getSelectedFileType()?.multiple ? 'Select Files *' : 'Select File *'}
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                            <p className="text-sm text-gray-600 mb-2">
                                {getSelectedFileType()?.multiple
                                    ? 'Drag and drop multiple files here, or click to select'
                                    : 'Drag and drop a file here, or click to select'
                                }
                            </p>
                            <input
                                type="file"
                                multiple={getSelectedFileType()?.multiple || false}
                                onChange={handleFileChange}
                                disabled={isLoading || !formData.fileType}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50"
                            >
                                Choose Files
                            </label>

                            {formData.files.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700">Selected files:</p>
                                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                                        {formData.files.map((file, index) => (
                                            <li key={index}>• {file.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {errors.files && (
                            <p className="mt-1 text-sm text-red-600">{errors.files}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            )}
                            {isLoading ? 'Uploading...' : 'Upload Files'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadMediaModal;