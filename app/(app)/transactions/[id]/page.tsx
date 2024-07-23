import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/typography";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { CopyIcon, CopyPlusIcon, DownloadIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const TransactionPage = async ({params}: {params: {id: string}}) => {
  const organisation = await selectCurrentOrganisation();

  const transaction = await db.query.transactionsTable.findFirst({
    where: (fields, {eq, and}) => and(eq(fields.id, params.id), eq(fields.organisationId, organisation.id)),
    with: {
      category: true,
      subCategory: true,
    }
  })
  if (!transaction) notFound();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Transactions</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{transaction.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Title>{transaction.name}</Title>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">

        </div>
        <div className="grid gap-4 [&>a]:justify-start">
          <Button asChild variant="outline">
            <Link href={`/transactions/${transaction.id}/edit`}><PencilIcon /> Edit transaction</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/transactions/create`}><CopyPlusIcon /> Duplicate transaction</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/transactions/${transaction.id}/transaction.pdf`}><DownloadIcon /> Export PDF</Link>
          </Button>
          <Button asChild variant="destructive">
            <Link href={`/transactions/create`}><TrashIcon /> Delete transaction</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default TransactionPage;