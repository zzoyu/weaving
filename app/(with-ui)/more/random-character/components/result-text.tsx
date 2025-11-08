import { ReactNode } from "react";

export default function ResultText({ children }: { children: ReactNode }) {
  return (
    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
      {children}
    </p>
  );
}
