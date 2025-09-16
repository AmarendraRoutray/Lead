import React from "react";

export const Table = ({ children }) => (
  <table className="w-full border-collapse text-sm">{children}</table>
);

export const TableHeader = ({ children }) => (
  <thead className="bg-gray-100 text-left">{children}</thead>
);

export const TableRow = ({ children, className = "" }) => (
  <tr className={`border-b last:border-0 ${className}`}>{children}</tr>
);

export const TableHead = ({ children }) => (
  <th className="px-4 py-2 font-semibold">{children}</th>
);

export const TableBody = ({ children }) => <tbody>{children}</tbody>;

export const TableCell = ({ children }) => (
  <td className="px-4 py-2">{children}</td>
);
