import { ChartColumnIcon } from "@/components/icons/chart-column"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Heading, Muted, Title } from "@/components/ui/typography"
import Link from "next/link"

const ReportLink = ({title, description, href}: {title: string; description: string; href: string}) => {
  return (
    <Button variant="outline" className="flex-col justify-start whitespace-normal" size={null} asChild>
      <Link href={href}>
        <div className="h-48 w-full bg-muted flex justify-center items-end overflow-hidden">
          <div className="rounded-t-xl h-44 w-44 bg-background drop-shadow-lg -mb-4 p-4 space-y-1">
            <div className="rounded-full h-2 w-2/3 bg-muted" />
            <div className="rounded-full h-2 w-3/4 bg-muted" />
            <div className="rounded-full h-2 w-1/4 bg-muted" />

            <div className="flex gap-1 pt-2">
              <div className="rounded-full h-2 w-2 bg-muted" />
              <div className="rounded-full h-2 w-1/3 bg-muted" />
            </div>
            <div className="flex gap-1">
              <div className="rounded-full h-2 w-2 bg-muted" />
              <div className="rounded-full h-2 w-3/4 bg-muted" />
            </div>
            <div className="flex gap-1">
              <div className="rounded-full h-2 w-2 bg-muted" />
              <div className="rounded-full h-2 w-1/2 bg-muted" />
            </div>
            <div className="flex gap-1">
              <div className="rounded-full h-2 w-2 bg-muted" />
              <div className="rounded-full h-2 w-2/3 bg-muted" />
            </div>

            <div className="rounded-full h-2 w-2/3 bg-muted !mt-3" />
            <div className="rounded-full h-2 w-1/2 bg-muted" />
          </div>
        </div>
        <div className="p-4 w-full">
          <Heading className="text-lg">{title}</Heading>
          <Muted>{description}</Muted>
        </div>
      </Link>
    </Button>
  )
}

const ReportsPage = () => {
  return (
    <>
      {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Reports</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}

      <Title icon={ChartColumnIcon}>Report builder</Title>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportLink title="Category summaries" description="Income and expense totals for each sub category, in a specified time period." href={`/reports/category-summaries`} />
        <ReportLink title="Transaction logs" description="Logs of all transactions by category, account type and income/expense." href={`/reports/transaction-log`} />
        <ReportLink title="Raw data exports" description="Exports of transactions as CSV to import into an Excel spreadsheet. Useful for data backups." href={`/reports/raw-data-exports`} />
      </div>
    </>
  )
}

export default ReportsPage;