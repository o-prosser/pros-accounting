"use client";

import { Slot } from "radix-ui";
import { usePathname, useSearchParams } from "next/navigation";

const ActivePage = ({
  pathname,
  match = "startsWith",
  children,
  searchParamName,
  searchParamContent,
}: {
  pathname: string;
  match?: "startsWith" | "eq" | "searchParam";
  children: React.ReactNode;
  searchParamName?: string;
  searchParamContent?: string;
}) => {
  const currentPathname = usePathname();
  const searchParams = useSearchParams();

  let active =
    match === "startsWith"
      ? currentPathname.startsWith(pathname)
      : match === "eq"
      ? currentPathname === pathname
      : match === "searchParam"
      ? searchParams.get(searchParamName || "") === searchParamContent
      : false;

  if (
    match === "startsWith" &&
    pathname === "/cashbook" &&
    searchParams.get("account") !== null
  )
    active = false;

  return <Slot.Root data-active={active}>{children}</Slot.Root>;
};

export default ActivePage;
