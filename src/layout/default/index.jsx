import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BottomNav from "../default/Sidebar/BottomNav"
import LogoutConfirm from "../../modals/LogoutConfirm"
import Sidebar from "./Sidebar";
import LayoutProvider from "./LayoutProvider"

const DefaultLayout = ({ children }) => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    sessionStorage.clear();
    setShowLogout(false);
    navigate("/login", { replace: true });
  };

  return (
    <LayoutProvider>
      <div className="flex min-h-screen bg-gray-50">
        <div className="hidden lg:flex">
          <Sidebar onLogoutClick={() => setShowLogout(true)} />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto relative">
          <div className="p-6">{children}</div>

          <div className="block lg:hidden">
            <BottomNav onLogoutClick={() => setShowLogout(true)} />
          </div>
        </main>
      </div>

      <LogoutConfirm open={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} />
    </LayoutProvider>
  );
};

export default DefaultLayout;