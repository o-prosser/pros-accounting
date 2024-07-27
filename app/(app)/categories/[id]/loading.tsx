import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircleIcon } from "lucide-react";

const Loading = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Transactions</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Skeleton className="h-3.5 w-20" />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-4 my-1.5 w-28" />
          </div>

          <Skeleton className="h-[30px] w-40 mb-[30px]" />
        </div>
        <Skeleton className="h-10 w-[87.67px]" />
      </div>

      <Skeleton className="h-4 my-1.5" />
      <Skeleton className="h-[30px] mt-[9px] mb-[15px]" />

      <Skeleton className="h-11 mb-6" />

      <div className="divide-y border-y">
        <div className="h-[83px]" />
        <div className="h-[83px]" />
        <div className="h-[83px]" />
        <div className="h-[83px]" />
      </div>

      <div className="mt-[14px] flex justify-evenly">
        {Array.from({ length: 12 }).map((_, idx) => (
          <Skeleton key={idx} className="h-3 w-4 my-[1.5px]" />
        ))}
      </div>

      <div className="mt-3 flex gap-4 justify-center">
        <Skeleton className="h-2 w-[54px]" />
        <Skeleton className="h-2 w-[54px]" />
      </div>

      <div className="mt-10 mb-4 flex justify-between items-end">
        <Skeleton className="h-5 w-[139.09px]" />
        <Skeleton className="h-10 w-[175.85px]" />
      </div>
      <div className="rounded-lg bg-muted flex items-center justify-center gap-2 h-[212px]">
        <LoaderCircleIcon className="h-5 w-5 animate-spin" />
        <span className="font-medium text-sm">Loading sub categories...</span>
      </div>

      <div className="mt-10 mb-4 flex justify-between items-end">
        <Skeleton className="h-5 w-[120.65px]" />
        <Skeleton className="h-10 w-[166.05px]" />
      </div>
      <div className="rounded-lg bg-muted flex items-center justify-center gap-2 h-[212px]">
        <LoaderCircleIcon className="h-5 w-5 animate-spin" />
        <span className="font-medium text-sm">Loading transactions...</span>
      </div>
    </>
  );
}

export default Loading;