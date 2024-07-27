import { Caption, Title } from "@/components/ui/typography"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LoaderCircleIcon, PlusIcon } from "lucide-react"
import TransactionsIndex from "./_components"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Metadata } from "next"

export const metadata: Metadata = {title: "Transactions"}

const TransactionsPage = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Cash book</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-start justify-between">
        <div>
          <Title className="mb-0">Cash book</Title>
          <Caption className="mb-6">Search and sort the log of your transactions.</Caption>
        </div>
        <Button asChild>
          <Link href="/transactions/create">
            <PlusIcon />
            <span className="hidden sm:inline">Add transaction</span>
          </Link>
        </Button>
      </div>

      <Suspense
        fallback={
          <div className="rounded-lg bg-muted flex items-center justify-center gap-2 h-[80vh]">
            <LoaderCircleIcon className="h-5 w-5 animate-spin" />
            <span className="font-medium text-sm">Loading transactions...</span>
          </div>
        }
      >
        <TransactionsIndex />
      </Suspense>
    </>
  );
}

export default TransactionsPage