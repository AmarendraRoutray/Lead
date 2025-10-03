import React, { useState, useEffect } from "react";
import {
    Home,
    MoreHorizontal,
    Edit,
    LayoutGrid,
    List,
    Plus
} from "lucide-react";

import image1 from "../../assets/images/image1.jpg"
import image2 from "../../assets/images/image2.jpeg"
import image3 from "../../assets/images/image3.jpg"

import EditProject from "./EditProject";

const projects = [
    {
        id: 1,
        name: "REB",
        type: "Residential - New Launch",
        description: "2 BHK Flat In Vanakbara, Dadra And Nagar Haveli And Daman And Diu",
        price: "₹ 25 Lac",
        image: image1,
        showDetails: true,
    },
    {
        id: 2,
        name: "Harshu Plaza",
        type: "Residential - New Launch",
        description: "2 BHK Flat In Vanakbara, Dadra And Nagar Haveli And Daman And Diu",
        price: "₹ 25 Lac",
        image: image2,
        showDetails: true,
    },
    {
        id: 3,
        name: "Satyam Developers",
        type: "Residential",
        description: "2 BHK 2 In Vanakbara, Dadra And Nagar Haveli And Daman And Diu",
        price: "",
        image: image3,
        showDetails: true,
    },
    {
        id: 4,
        name: "Dholera Plaza",
        image: image2,
        description: "2 BHK 2 In Vanakbara, Dadra And Nagar Haveli And Daman And Diu",
        showDetails: true,
    },
    {
        id: 5,
        name: "Sigma Heights",
        image: image3,
        description: "2 BHK 2 In Vanakbara, Dadra And Nagar Haveli And Daman And Diu",
        showDetails: false,
    },
    {
        id: 6,
        name: "Rajkot 4BHK",
        image: image1,
        description: "2 BHK 2 In Vanakbara, Dadra And Nagar Haveli And Daman And Diu",
        showDetails: true,
    },
];

export default function Projects() {
    const [viewType, setViewType] = useState("grid");
    const [menuOpenId, setMenuOpenId] = useState(null);
    const [search, setSearch] = useState("");
    const [editingProject, setEditingProject] = useState(null);

    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        // Close any open menu when view changes
        setMenuOpenId(null);
    }, [viewType]);

    const handleEditClick = (project) => {
        setEditingProject(project);
        setMenuOpenId(null);  // close menus
    };

    if (editingProject) {
        return (
            <EditProject
                project={editingProject}
                onCancel={() => setEditingProject(null)}
            />
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Project Manager ({projects.length})</h2>
                <div className="flex md:flex-shrink-0 items-center gap-2">
                    <input
                        type="text"
                        className="border rounded px-5 py-2 text-sm h-10"
                        placeholder="Search Project"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={() => setViewType("grid")}
                        className={`p-2 border rounded ${viewType === "grid" ? "bg-indigo-50 border-indigo-500" : "bg-white"} flex items-center gap-1 h-10`}
                        title="Grid View"
                    >
                        <LayoutGrid size={15} />
                        <span>Grid View</span>
                    </button>
                    <button
                        onClick={() => setViewType("list")}
                        className={`p-2 border rounded ${viewType === "list" ? "bg-indigo-50 border-indigo-500" : "bg-white"} flex items-center gap-1 h-10`}
                        title="List View"
                    >
                        <List size={15} />
                        <span>List View</span>
                    </button>
                    <button className="bg-blue-600 text-white p-2 gap-1 rounded text-sm font-semibold flex items-center h-10">
                        <Plus size={15} />
                        <span className="mr-2">New</span>
                    </button>
                </div>
            </div>

            {viewType === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white rounded-lg p-2 pb-4 shadow hover:shadow-lg relative"
                        >
                            {/* Project image or placeholder */}
                            <div className="h-[110px] w-full bg-gray-200 rounded flex justify-center items-center relative">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="h-full w-full object-cover rounded"
                                    />
                                ) : (
                                    <Home className="w-10 h-10 text-gray-400" />
                                )}

                                {/* 3-dot menu button */}
                                <button
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setMenuOpenId(menuOpenId === project.id ? null : project.id);
                                    }}
                                >
                                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                </button>

                                {/* Edit button popup */}
                                {menuOpenId === project.id && (
                                    <div className="absolute top-10 right-2 bg-white rounded shadow-md px-3 py-1 flex items-center gap-1 z-10 cursor-pointer">
                                        <span
                                            className="flex items-center"
                                            onClick={() => handleEditClick(project)}>
                                            <Edit className="w-4 h-4 mr-1 text-indigo-600" />
                                            <span className="text-indigo-600 text-sm">
                                                Edit
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 px-2">
                                <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                                {project.showDetails && (
                                    <>
                                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded mr-2 mb-0.5">
                                            {project.type}
                                        </span>
                                        <div className="text-xs text-gray-500 mb-0.5">{project.description}</div>
                                        <div className="text-sm font-medium text-green-700">{project.price}</div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // List View Table
                <table className="w-full bg-white rounded-lg shadow">
                    <thead>
                        <tr className="text-left bg-gray-100">
                            <th className="p-3">Project</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.map((project) => (
                            <tr key={project.id} className="border-t hover:bg-gray-100">
                                <td className="p-3 flex items-center gap-2">
                                    <div className="bg-gray-200 rounded flex justify-center items-center w-10 h-10">
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="h-full w-full object-cover rounded"
                                            />
                                        ) : (
                                            <Home className="w-6 h-6 text-gray-400" />
                                        )}
                                    </div>
                                    <span className="font-medium">{project.name}</span>
                                </td>
                                <td className="p-3 text-xs">{project.type || "-"}</td>
                                <td className="p-3 text-xs">{project.description || "-"}</td>
                                <td className="p-3 text-sm">{project.price || "-"}</td>
                                <td className="p-3 relative">
                                    <button
                                        className="bg-white rounded-full p-1 border"
                                        onClick={() => setMenuOpenId(menuOpenId === project.id ? null : project.id)}
                                    >
                                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                    </button>
                                    {menuOpenId === project.id && (
                                        <div className="absolute bg-white rounded shadow-md px-3 py-1 flex items-center gap-1 z-10 cursor-pointer    ">
                                            <span
                                                className="flex items-center"
                                                onClick={() => handleEditClick(project)}>
                                                <Edit className="w-4 h-4 mr-1 text-indigo-600" />
                                                <span className="text-indigo-600 text-sm">
                                                    Edit
                                                </span>
                                            </span>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
