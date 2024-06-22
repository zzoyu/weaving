"use client";

import clsx from "clsx";

export interface TabItemProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  isActive?: boolean;
}

export function TabItem({ title, children, isActive }: TabItemProps) {
  return (
    <div
      className={clsx("w-full flex flex-col items-center", {
        hidden: !isActive,
      })}
    >
      {children}
    </div>
  );
}
