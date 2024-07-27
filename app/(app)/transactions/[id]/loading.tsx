import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Caption } from "@/components/ui/typography";

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

      <Skeleton className="h-[30px] w-40 mb-[30px]" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div>
            <Skeleton className="h-4 mb-2 w-32" />
            <Skeleton className="h-[30px] w-40" />
          </div>

          <div className="mt-[30px] border-t">
            <dl className="divide-y">
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Date</dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                  <Skeleton className="h-3 w-20" />
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">
                  Receipt book number
                </dt>
                <dd className="mt-1 text-sm items-center text-muted-foreground sm:col-span-2 sm:mt-0 flex">
                  <Skeleton className="h-3 w-4" />
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Category</dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                  <Skeleton className="h-3 w-32" />
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Date added</dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                  <Skeleton className="h-3 w-24" />
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Notes</dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0"></dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Files</dt>
                <dd className="mt-2 text-sm sm:col-span-2 sm:mt-0"></dd>
              </div>
            </dl>
          </div>
        </div>
        <div>
          <div className="grid gap-4">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Loading