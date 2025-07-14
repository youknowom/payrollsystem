// src/components/SkeletonRow.jsx
import React from "react";

const SkeletonRow = () => (
  <tr className="border-t border-borderColor animate-pulse">
    {/* Employee (avatar + name) */}
    <td className="p-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>
    </td>
    {/* Emp ID */}
    <td className="p-3">
      <div className="h-4 w-20 rounded bg-gray-200" />
    </td>
    {/* Phone */}
    <td className="p-3">
      <div className="h-4 w-24 rounded bg-gray-200" />
    </td>
    {/* Status pill */}
    <td className="p-3">
      <div className="h-6 w-16 rounded-full bg-gray-200" />
    </td>
    {/* Action (select) */}
    <td className="p-3">
      <div className="h-8 w-24 rounded bg-gray-200" />
    </td>
  </tr>
);

export default SkeletonRow;
