// src/hooks/useWindowResize.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openSidebarMobile, closeSidebarMobile } from "../store/slices/sidebarSlice";

const useWindowResize = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile
        dispatch(closeSidebarMobile());
      } else {
        // Desktop
        dispatch(openSidebarMobile());
      }
    };

    handleResize(); // Run on first mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
};

export default useWindowResize;
