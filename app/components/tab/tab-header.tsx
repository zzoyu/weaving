"use client";

interface TabHeaderProps {
  children: string;
  onClick: () => void;
  isActive?: boolean;
}

export default function TabHeader({ children, onClick }: TabHeaderProps) {
  return (
    <button className="p-1 underline" onClick={onClick}>
      {children}
    </button>
  );
}
