"use client";

import { usePathname } from "next/navigation";

const CheckSidepanelVisible = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div
      className="group"
      data-sidepanel-visible={
        pathname.includes("transactions") || pathname.includes("transfers")
      }
    >
      {children}
    </div>
  );
};

export default CheckSidepanelVisible;
