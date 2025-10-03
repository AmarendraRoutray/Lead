import { Edit2 } from "lucide-react";

const OtherInfo = ({ otherInfo }) => (
  <div className="pt-2">
    <div className="grid grid-cols-3 gap-x-6 gap-y-4 text-sm">
      <div>
        <div className="text-gray-400 mb-1">Age</div>
        <div>{otherInfo?.age || "-"}</div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Referred By</div>
        <div className="flex items-center gap-2">
          {otherInfo?.referredBy || "-"}
          <Edit2 className="text-gray-400 cursor-pointer" size={16} />
        </div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Gender</div>
        <div>{otherInfo?.gender || "-"}</div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Birthday</div>
        <div>{otherInfo?.birthday || "-"}</div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Assigned User</div>
        <div>{otherInfo?.assignedUser || "-"}</div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Industry</div>
        <div>{otherInfo?.industry || "-"}</div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Company</div>
        <div>{otherInfo?.company || "-"}</div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">Annual Income</div>
        <div>{otherInfo?.annualIncome || "-"}</div>
      </div>
      <div>
        <div className="text-gray-400 mb-1">City</div>
        <div className="font-semibold">{otherInfo?.city || "-"}</div>
      </div>
    </div>
  </div>
);

export default OtherInfo;
