import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ trigger, children, align = "right" }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger button */}
      <div onClick={() => setOpen((prev) => !prev)}>
        {trigger(open)}
      </div>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[60] py-1">
          {children({ close: () => setOpen(false) })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
