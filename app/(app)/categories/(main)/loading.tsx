import { Skeleton } from "@/components/ui/skeleton";
import {
  BanknoteArrowUpIcon,
  LoaderCircleIcon,
  ShoppingBagIcon,
} from "lucide-react";

const CategoriesLoading = () => {
  return (
    <>
      <div className="rounded-2xl border divide-y">
        {Array.from({ length: 9 }).map((_, key) => (
          <div className="grid grid-cols-3 p-3" key={key}>
            <div>
              <Skeleton className="h-5 w-36 mb-1" />
              <Skeleton className="h-4 w-36" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <BanknoteArrowUpIcon className="size-4 text-muted-foreground" />
                <div className="flex items-end gap-1">
                  <Skeleton className="h-3 w-20" />
                  <p className="text-sm pb-[0.5px] text-muted-foreground">
                    income
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBagIcon className="size-4 text-muted-foreground" />
                <div className="flex items-end gap-1">
                  <Skeleton className="h-3 w-20" />
                  <p className="text-sm pb-[0.5px] text-muted-foreground">
                    expenses
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoriesLoading;
