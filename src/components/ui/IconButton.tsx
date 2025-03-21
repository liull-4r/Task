import React from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  bordered?: boolean;
  onClick?: () => void;
}

export default function IconButton({
  icon,
  label,
  bordered = false,
  onClick,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-6 py-2 rounded cursor-pointer 
        ${bordered ? "border border-gray-300" : ""}
        text-gray-700`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}
