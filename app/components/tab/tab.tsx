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

interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
}

export function Tab({ children, ...props }: TabProps) {
  const tabHeaders: string[] = Array.isArray(children)
    ? Children.map(children, ({ props }) => {
        return props.title;
      })
    : [children?.props?.title];

  console.log(tabHeaders);

  const [activeTab, setActiveTab] = useState(0);
  return (
    <div {...props}>
      <div>
        {tabHeaders.map((header, index) => (
          <TabHeader
            onClick={() => setActiveTab(index)}
            key={"tab-header-" + header}
            isActive={activeTab === index}
          >
            {header}
          </TabHeader>
        ))}
      </div>
      {Children.map(children, (child, index) => {
        const { children, ...props } = child.props;
        return (
          <TabItem {...props} isActive={activeTab === index}>
            {children}
          </TabItem>
        );
      })}
    </div>
  );
}
