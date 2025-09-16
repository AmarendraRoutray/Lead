import React, { useState } from "react";

export const Tabs = ({ defaultValue, onValueChange, children }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  // inject context via clone
  return (
    <div className="w-full">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { value, onChange: handleChange })
      )}
    </div>
  );
};

export const TabsList = ({ children, className = "" }) => (
  <div className={`flex gap-2 flex-wrap ${className}`}>{children}</div>
);

export const TabsTrigger = ({ children, tabValue, value, onChange }) => {
  const isActive = value === tabValue;
  return (
    <button
      onClick={() => onChange(tabValue)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition 
        ${isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, value, tabValue }) => {
  if (value !== tabValue) return null;
  return <div className="mt-4">{children}</div>;
};
