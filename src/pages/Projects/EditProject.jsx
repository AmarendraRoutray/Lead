import React from "react";
import { Edit } from "lucide-react";
import BackButton from "../../components/BackButton";

export default function EditProject({ project, onCancel }) {
    if (!project) return null;

    return (    
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex items-center gap-3">
                <BackButton label="" onClick={onCancel} className="mb-4" />
                <h2 className="text-xl font-bold mb-4">Edit Project: {project.name}</h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b mb-6">
                <button className="pb-2 border-b-2 border-blue-600 font-semibold text-blue-600">
                    Basic Details
                </button>
                <button className="pb-2 text-gray-500">Media Upload</button>
                <button className="pb-2 text-gray-500">Additional Info</button>
            </div>

            {/* Form */}
            <div>
                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Project Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Project/Property Name *
                            </label>
                            <input
                                type="text"
                                value={project.name}
                                readOnly
                                className="border rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Developer Name *
                            </label>
                            <input
                                type="text"
                                defaultValue="Satyam Shrivastav"
                                readOnly
                                className="border rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Inventory Type</label>
                            <select className="border rounded px-3 py-2 w-full">
                                <option>New Launch</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Possession Type</label>
                            <select className="border rounded px-3 py-2 w-full">
                                <option>Ready to move in</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">Configuration</h2>
                    <div className="grid grid-cols-6 gap-3 mb-4 text-center">
                        <input
                            className="border rounded px-2 py-1 text-sm"
                            defaultValue="2"
                            readOnly
                        />
                        <input
                            className="border rounded px-2 py-1 text-sm"
                            defaultValue="2 BHK"
                            readOnly
                        />
                        <input
                            className="border rounded px-2 py-1 text-sm"
                            defaultValue="1200 Sq.feet"
                            readOnly
                        />
                        <input
                            className="border rounded px-2 py-1 text-sm"
                            defaultValue="Semi Furnished"
                            readOnly
                        />
                        <input
                            className="border rounded px-2 py-1 text-sm"
                            defaultValue="South"
                            readOnly
                        />
                        <input
                            className="border rounded px-2 py-1 text-sm"
                            defaultValue="25 Lac"
                            readOnly
                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        <button className="bg-gray-100 border border-gray-300 rounded px-4 py-2 text-gray-700 font-semibold flex items-center gap-2">
                            <Edit className="w-4 h-4" />
                            Edit
                        </button>

                        <button className="bg-gray-100 border border-gray-300 rounded px-4 py-2 text-gray-700 font-semibold">
                            Delete
                        </button>

                        <button className="bg-blue-600 text-white rounded px-4 py-2 font-semibold">
                            + Add
                        </button>
                    </div>
                </section>

                <div className="flex justify-end mt-6 gap-3">
                    <button
                        onClick={onCancel}
                        className="border border-gray-300 rounded px-5 py-2 text-gray-600"
                    >
                        Cancel
                    </button>
                    <button className="bg-blue-700 text-white rounded px-5 py-2 font-semibold">
                        Save & Next
                    </button>
                </div>
            </div>
        </div>
    );
}
