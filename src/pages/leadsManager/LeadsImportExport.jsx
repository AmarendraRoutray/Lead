import React, { useState } from "react";
import { UploadCloud, Download } from "lucide-react";

const exportData = [
    { id: 1, time: "3:47 pm, 3rd Nov 2023", count: 11, by: "Hitveksh Bamaniya", status: "Completed" },
    { id: 2, time: "11:01 am, 2nd Mar 2023", count: 1, by: "Hitveksh Bamaniya", status: "Completed" },
    { id: 3, time: "11:00 am, 2nd Mar 2023", count: 1, by: "Hitveksh Bamaniya", status: "Completed" }
];

export default function LeadsImportExport() {
    const [tab, setTab] = useState("import");

    return (
        <div className="p-4 md:p-6">
            <div className="bg-white mx-auto rounded shadow p-4">
                <div className="flex border-b gap-8 mb-6">
                    <button className={`pb-2 font-medium border-b-2 ${tab === 'import' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400'}`} onClick={() => setTab('import')}>Import</button>
                    <button className={`pb-2 font-medium border-b-2 ${tab === 'export' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400'}`} onClick={() => setTab('export')}>Export</button>
                </div>
                {tab === 'import' ? <ImportTab /> : <ExportTab />}
            </div>
        </div>
    )
}

function ImportTab() {
    return (
        <div className="">
            <div className="flex space-x-6 mb-5 text-blue-600 font-medium items-center border-b pb-2">
                <span className="border-b-2 border-blue-600 pb-1 px-2">1 Prepare</span>
                <span>2 Upload</span>
                <span>3 Match</span>
                <span>4 Assign</span>
            </div>
            <div className="border border-blue-100 bg-blue-50 p-10 rounded flex flex-col items-center mb-6">
                <UploadCloud className="mb-2 text-blue-500" size={40} />
                <span className="mb-4 text-gray-500">Drag & Drop CSV file</span>
                <button className="bg-blue-600 text-white px-5 py-2 rounded mb-2 flex items-center font-semibold">
                    + Upload CSV File
                </button>
                <a href="#" className="text-blue-600 underline text-sm mb-1">Download Sample CSV File</a>
                <div className="text-xs text-gray-400">Only .csv files are supported with max 5 MB file size.</div>
            </div>
            <button className="px-6 py-2 rounded bg-gray-100 border text-gray-600 font-semibold">Go Back</button>
        </div>
    )
}

function ExportTab() {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Export</h2>
            <p className="mb-4 text-gray-500">Export your Leads from Propacity Platform in CSV format.</p>
            <table className="w-full mb-8 text-sm border rounded">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">S.No.</th>
                        <th className="p-2">Exported Date</th>
                        <th className="p-2">Lead Count</th>
                        <th className="p-2">Exported By</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {exportData.map((row, idx) => (
                        <tr className="border-t" key={row.id}>
                            <td className="p-2">{idx + 1}</td>
                            <td className="p-2">{row.time}</td>
                            <td className="p-2">{row.count}</td>
                            <td className="p-2">{row.by}</td>
                            <td className="p-2"><span className="bg-green-200 text-green-800 px-2 py-0.5 rounded text-xs">{row.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div className="bg-gray-50 border rounded p-4 max-w-lg">
                <p className="mb-3 text-sm text-gray-600">
                    You can export leads in csv by using filters below. You cannot export more than 600 leads in a single export.
                </p>
                <div className="mb-3">
                    <div className="font-semibold mb-1">Portals</div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <label><input type="checkbox" /> 99 Acres</label>
                        <label><input type="checkbox" /> Magicbricks</label>
                        <label><input type="checkbox" /> Common Floor</label>
                        <label><input type="checkbox" /> Makaan</label>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="font-semibold mb-1 flex items-center">Marketing Agency <span className="ml-2 text-xs text-blue-500">1</span></div>
                    <div className="pl-1 mb-1"><label className="text-sm"><input type="checkbox" /> Clear All</label></div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <label><input type="checkbox" /> Realty Media</label>
                        <label><input type="checkbox" defaultChecked /> Bigshot</label>
                        <label><input type="checkbox" /> Real Estate Bigshot</label>
                        <label><input type="checkbox" /> Premium Marketing</label>
                        <label><input type="checkbox" /> Realty Media</label>
                        <label><input type="checkbox" /> Realty Growth</label>
                    </div>
                </div>
                <div className="flex gap-2 mt-5">
                    <button className="px-4 py-2 rounded border bg-gray-100 text-gray-700 font-semibold">Cancel</button>
                    <button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold flex items-center gap-1">
                        <Download size={16} /> Export Leads
                    </button>
                </div>
            </div> */}
        </div>
    )
}
