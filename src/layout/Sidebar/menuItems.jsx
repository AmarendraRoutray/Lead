
import { LayoutDashboard, TableProperties, ChartNoAxesCombined, Settings, User } from "lucide-react";
import { FullAccessRoles } from "../../router/permission";

export const menuItems = [
  { id: "dashboard", path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, accessRole: FullAccessRoles },
  { id: "campaign", path: "/campaign", label: "Leads", icon: TableProperties, accessRole: FullAccessRoles },
  { id: "profile", path: "/profile", label: "Profile", icon: User, accessRole: FullAccessRoles },
  { id: "influencer", path: "/influencer", label: "Analytics", icon: ChartNoAxesCombined, accessRole: FullAccessRoles },
  { id: "brand", path: "/brand", label: "Settings", icon: Settings, accessRole: FullAccessRoles },
];
