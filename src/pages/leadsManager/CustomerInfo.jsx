import { Edit2 } from "lucide-react";

const CustomerInfo = ({ customerInfo }) => (
  <div className="pt-2">
    <div className="grid grid-cols-3 gap-x-6 gap-y-4 text-sm">
      <div>
        <div className="text-gray-400 mb-1">Purpose</div>
        {/* Purpose as checkbox + select */}
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={!!customerInfo?.purposeChecked} readOnly className="form-checkbox h-4 w-4 text-blue-600"/>
          <select
            className="border rounded px-2 py-1 bg-white text-gray-800 min-w-[90px]"
            value={customerInfo?.purpose || ""}
            readOnly
          >
            <option>Investment</option>
            <option>Residential</option>
            <option>Commercial</option>
          </select>
        </div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Property Type</div>
        <div>{customerInfo?.propertyType || "-"}</div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Configuration Type</div>
        <div>{customerInfo?.configurationType || "-"}</div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Size</div>
        <div className="flex items-center gap-2">
          {customerInfo?.size || "-"}
          <Edit2 className="text-gray-400 cursor-pointer" size={16} />
        </div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Requirement Type</div>
        <div>{customerInfo?.requirementType || "-"}</div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Funding Source</div>
        <div>{customerInfo?.fundingSource || "-"}</div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Employment Type</div>
        <div>{customerInfo?.employmentType || "-"}</div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Facing</div>
        <div>{customerInfo?.facing || "-"}</div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Customer Address</div>
        <div>{customerInfo?.address || "-"}</div>
      </div>
    </div>
  </div>
);

export default CustomerInfo;
