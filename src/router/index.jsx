import { useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import LoginPage from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import Leads from "../pages/leadsManager/Leads";
import Analytics from "../pages/Analytics";
import Setting from "../pages/Setting";
import SignUp from "../pages/auth/SignUp";
import Profile from "../pages/user/Profile";
import { useSelector } from "react-redux";
import DefaultLayout from "../layout/default";


const BlankLayout = ({ children }) => <div>{children}</div>;
const NotFound = () => <h2>404 Not Found</h2>;
const ScrollToTop = ({ children }) => children;

const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const allRoutes = [
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
    element: Analytics,
    isProtected: true,
    routeTitle: "Analytics",
  },
  {
    url: "/brand",
    element: Setting,
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

function Router() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const renderRoutes = (routes) =>
    routes.map((item) => {
      const Element = item.element;

      let element;
      if (item.isProtected) {
        element = (
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <DefaultLayout>
              <Element />
            </DefaultLayout>
          </PrivateRoute>
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
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to={"/dashboard"} />: <Navigate to={"/login"} />}
        />
        {renderRoutes(allRoutes)}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ScrollToTop>
  );
}

export default Router;
