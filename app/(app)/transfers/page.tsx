import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Title } from "@/components/ui/typography";
import { LoaderCircleIcon } from "lucide-react";
import { Suspense } from "react";
import TransfersIndex from "./_components";
import CreateTransfer from "./_components/create";

const TransfersPage = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Transfers</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-start justify-between">
        <Title>Account transfers</Title>
        <CreateTransfer />
      </div>

      <Suspense
        fallback={
          <div className="rounded-lg bg-muted flex items-center justify-center gap-2 h-[80vh]">
            <LoaderCircleIcon className="h-5 w-5 animate-spin" />
            <span className="font-medium text-sm">Loading account transfers...</span>
          </div>
        }
      >
        <TransfersIndex />
      </Suspense>
    </>
  );
}

export default TransfersPage;