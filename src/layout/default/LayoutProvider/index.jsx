import React, { createContext, useContext, useState } from "react";

const LayoutContext = createContext();
const LayoutUpdateContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(true);
  const [compactSidebar, setCompactSidebar] = useState(false);

  const sidebarMobile = () => setSidebarActive(!sidebarActive);
  const sidebarCompact = () => setCompactSidebar(!compactSidebar);

  return (
    <LayoutContext.Provider value={{ sidebarActive, compactSidebar }}>
      <LayoutUpdateContext.Provider value={{ sidebarMobile, sidebarCompact }}>
        {children}
      </LayoutUpdateContext.Provider>
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
export const useLayoutUpdate = () => useContext(LayoutUpdateContext);

export default LayoutProvider;