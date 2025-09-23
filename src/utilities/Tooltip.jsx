import React from "react";

const Tooltip = ({ visible, x, y, content }) => {
  if (!visible) return null;
  return (
    <div
      className="fixed pointer-events-none bg-black bg-opacity-75 text-white px-3 py-1 rounded text-xs whitespace-nowrap z-50 select-none"
      style={{
        top: y,
        left: x,
        transform: "translate(-50%, -100%)",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {content}
    </div>
  );
};

export default Tooltip;
