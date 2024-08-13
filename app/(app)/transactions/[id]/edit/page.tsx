import { Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { selectCurrentOrganisation } from "@/models/organisation";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import EditForm from "./_components/form";

export const runtime = "edge";

const TransactionsEditPage = async ({ params }: { params: { id: string } }) => {
  const categories = await selectCategoriesMin();
  const organisation = await selectCurrentOrganisation();

  const transaction = await db.query.transactionsTable.findFirst({
    where: (fields, { and, eq }) =>
      and(eq(fields.id, params.id), eq(fields.organisationId, organisation.id)),
    with: {
      file: true,
    },
  });
  if (!transaction) notFound();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Transactions</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Edit transaction</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Title>Edit transaction</Title>

      <EditForm transaction={transaction} categories={categories} />
    </>
  );
};

export default TransactionsEditPage;
