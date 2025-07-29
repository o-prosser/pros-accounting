"use client";

import { LoaderCircleIcon } from "lucide-react";
import { useLinkStatus } from "next/link";

export default function LoadingIndicator() {
  const { pending } = useLinkStatus();
  return pending ? (
    <>
      <div className="flex-1" />
      <div role="status" aria-label="Loading" className="">
        <LoaderCircleIcon className="size-5 text-muted-foreground animate-spin" />
      </div>
    </>
  ) : null;
}
