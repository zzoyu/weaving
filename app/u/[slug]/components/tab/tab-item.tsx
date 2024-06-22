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
      className={clsx("flex flex-col", {
        hidden: !isActive,
      })}
    >
      <h2>{title}</h2>
      {children}
    </div>
  );
}
