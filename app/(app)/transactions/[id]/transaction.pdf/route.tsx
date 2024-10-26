import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import {
  Document,
  Page,
  View,
  Text,
  renderToBuffer,
  Font,
} from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import { ReportLayout, SubTitle, Title, tw } from "@/components/report-layout";
import { notFound } from "next/navigation";
import { format } from "date-fns";

const Row = ({ label, value }: { label: string; value: string|number|null }) => {
  return (
    <View style={tw("flex flex-row py-3 border-b-[0.5px]")}>
      <View style={tw("w-1/2")}>
        <Text>{label}</Text>
      </View>
      <View style={tw("w-1/2 text-right")}>
        <Text>{value}</Text>
      </View>
    </View>
  );
};

export const GET = async (
  request: NextRequest,
  routeData: { params: Promise<{ id: string }> }
) => {
  const params = await routeData.params

  const organisation = await selectCurrentOrganisation();

  const transaction = await db.query.transactionsTable.findFirst({
    where: (column, { and, eq, lt, gt }) =>
      and(eq(column.id, params.id), eq(column.organisationId, organisation.id)),
    with: {
      category: true,
      subCategory: true,
    },
  });

  if (!transaction) notFound();

  const buffer = await renderToBuffer(
    <ReportLayout>
      <Title>{organisation.name}</Title>
      <SubTitle>Transaction details &mdash; {transaction.name}</SubTitle>

      <View>
        <Text style={tw("uppercase text-[10pt] mt-4")}>
          {transaction.income ? "Income" : "Expense"}
        </Text>
        <Text style={tw("text-[18pt] mb-2")}>
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(transaction.income ? parseFloat(transaction.income) : transaction.expense ? parseFloat(transaction.expense) : 0)}
        </Text>
      </View>

      <Row label="Date" value={format(transaction.date, "dd-MM-yyyy")} />
      <Row label="Receipt book number" value={transaction.receiptBookNumber} />
      <Row label="Account type" value={transaction.account ? (transaction.account.charAt(0).toUpperCase() + transaction.account.slice(1)): ""} />
      <Row label="Category" value={transaction.category.name} />
      <Row label="Sub category" value={transaction.subCategory?.name || null} />
      <Row label="Notes" value={transaction.notes} />
    </ReportLayout>,
  );

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-disposition": 'attachment;filename="ParticipantList.pdf"',
    },
  });
};
