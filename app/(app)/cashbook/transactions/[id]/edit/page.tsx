import { selectCategoriesMin } from "@/models/category";
import { notFound } from "next/navigation";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import BackButton from "@/components/back-button";
import EditTransactionForm from "./_components/form";

export const runtime = "edge";

const TransactionEditPage = async (props: {
  searchParams: Promise<{ [key: string]: string }>;
  params: Promise<{ id: string }>;
}) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const organisation = await selectCurrentOrganisation();

  const transaction = await db.query.transactionsTable.findFirst({
    where: (fields, { and, eq }) =>
      and(eq(fields.id, params.id), eq(fields.organisationId, organisation.id)),
    with: {
      file: true,
    },
  });
  if (!transaction) notFound();

  const categories = await selectCategoriesMin();

  return (
    <>
      <BackButton />

      <div className="rounded-2xl border bg-muted/50 p-3">
        <h3 className="font-medium text-xl flex-1 mb-3">Edit transaction</h3>

        <EditTransactionForm
          transaction={transaction}
          categories={categories.filter(
            (c) =>
              c.financialYearId === transaction.financialYearId ||
              c.financialYearId === null,
          )}
        />
      </div>
    </>
  );
};

export default TransactionEditPage;
