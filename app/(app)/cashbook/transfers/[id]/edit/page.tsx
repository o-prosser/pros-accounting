import { selectCategoriesMin } from "@/models/category";
import { notFound } from "next/navigation";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import BackButton from "@/components/back-button";
import EditTransferForm from "./_components/form";

export const runtime = "edge";

const TransfersEditPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;

  const organisation = await selectCurrentOrganisation();

  const transfer = await db.query.transfersTable.findFirst({
    where: (fields, { and, eq }) =>
      and(eq(fields.id, params.id), eq(fields.organisationId, organisation.id)),
  });
  if (!transfer) notFound();

  const categories = await selectCategoriesMin();

  return (
    <>
      <BackButton />

      <div className="rounded-2xl border bg-muted/50 p-3">
        <h3 className="font-medium text-xl flex-1 mb-3">Edit transfer</h3>

        <EditTransferForm transfer={transfer} categories={categories} />
      </div>
    </>
  );
};

export default TransfersEditPage;
