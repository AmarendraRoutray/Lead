import React from "react";

export const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}
  >
    {children}
  </span>
);
