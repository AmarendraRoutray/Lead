import { useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import LoginPage from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../layout/Sidebar/index";
import { LayoutProvider } from "../layout/LayoutProvider";
import Leads from "../pages/leadsManager/Leads";
import Influencer from "../pages/Influencer";
import Brand from "../pages/Brand";
import SignUp from "../pages/SignUp";
import BottomNav from "../layout/Sidebar/BottomNav";
import LogoutConfirm from "../modals/LogoutConfirm";
import Profile from "../pages/user/Profile";
import { useNavigate } from "react-router-dom";

// Default layout (with sidebar)
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

      <LogoutConfirm open={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout}/>
    </LayoutProvider>
  );
};

const BlankLayout = ({ children }) => <div>{children}</div>;

const NotFound = () => <h2>404 Not Found</h2>;
const ScrollToTop = ({ children }) => children;

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const allRoutes = [
  {
    url: "/login",
    element: LoginPage,
    isProtected: false,
    routeTitle: "Login",
  },
  {
    url: "/signup",
    element: SignUp,
    isProtected: false,
    routeTitle: "Signup",
  },
  {
    url: "/dashboard",
    element: Dashboard,
    isProtected: true,
    routeTitle: "Dashboard",
  },
  {
    url: "/campaign",
    element: Leads,
    isProtected: true,
    routeTitle: "Leads",
  },
  {
    url: "/influencer",
    element: Influencer,
    isProtected: true,
    routeTitle: "Analytics",
  }, 
  {
    url: "/brand",
    element: Brand,
    isProtected: true,
    routeTitle: "Settings",
  },
  {
    url: "/profile",
    element: Profile,
    isProtected: true,
    routeTitle: "Profile",
  }
];

function Router({ isAuthenticated, setIsAuthenticated, userRole, isCheckingAuth }) {
  const location = useLocation();

  const renderRoutes = (routes) =>
    routes.map((item) => {
      const Element = item.element;

      let element;
      if (item.isProtected) {
        element = (
          <DefaultLayout>
            <Element />
          </DefaultLayout>
        )
      } else {
        element = (
          <BlankLayout>
            <Element />
          </BlankLayout>
        );
      }

      return <Route key={item.url} path={item.url} element={element} />;
    });

  return (
    <ScrollToTop>
      <Routes>
        {renderRoutes(allRoutes)}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ScrollToTop>
  );
}

export default Router;
