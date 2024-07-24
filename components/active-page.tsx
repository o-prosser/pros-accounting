"use client";

import { Slot } from "@radix-ui/react-slot";
import { usePathname } from "next/navigation";

const ActivePage = ({pathname, match = 'startsWith', children}: {pathname: string, match?: 'startsWith'|"eq", children: React.ReactNode}) => {
  const currentPathname = usePathname();

  const active = match === 'startsWith' ? currentPathname.startsWith(pathname) : pathname === currentPathname;

  return (
    <Slot data-active={active}>
      {children}
    </Slot>
  )
}

export default ActivePage;