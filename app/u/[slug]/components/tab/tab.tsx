"use client";

import clsx from "clsx";
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import TabHeader from "./tab-header";
import { TabItemProps, TabItem } from "./tab-item";

interface TabProps {
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
}

export function Tab({ children }: TabProps) {
  const tabHeaders: string[] = Array.isArray(children)
    ? Children.map(children, ({ props }) => {
        return props.title;
      })
    : [children?.props?.title];

  console.log(tabHeaders);

  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <div>
        {tabHeaders.map((header, index) => (
          <TabHeader
            onClick={() => setActiveTab(index)}
            key={"tab-header-" + header}
            children={header}
            isActive={activeTab === index}
          />
        ))}
      </div>
      {Children.map(children, (child, index) => {
        return <TabItem {...child.props} isActive={activeTab === index} />;
      })}
    </div>
  );
}
