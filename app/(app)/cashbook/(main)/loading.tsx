import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircleIcon } from "lucide-react";

const CashbookLoading = () => {
  return (
    <>
      <div className="bg-muted/50 rounded-2xl border h-[66px] px-3 flex items-center mb-3 gap-2">
        <Skeleton className="h-6 w-[162px]" />
        <div className="flex-1" />
        <Skeleton className="h-10 w-[229px]" />
        <Skeleton className="h-10 w-[158px]" />
        <Skeleton className="h-10 w-[95px]" />
      </div>

      <div className="rounded-t-2xl border bg-muted/50 h-12" />
      <div className="rounded-b-2xl border-x border-b h-[500px] grid place-items-center">
        <LoaderCircleIcon className="animate-spin size-5 text-muted-foreground" />
      </div>
    </>
  );
};

export default CashbookLoading;
