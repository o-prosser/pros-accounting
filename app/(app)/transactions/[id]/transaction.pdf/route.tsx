import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import {
  Document,
  Page,
  View,
  Text,
  renderToBuffer,
  Font,
  renderToStream,
} from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import { ReportLayout, SubTitle, Title, tw } from "@/components/report-layout";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Template from "./template";

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

  const stream = await renderToStream(Template({organisation, transaction}));

  const blob = await new Response(stream).blob();

  const headers: Record<string, string> = {
    "Content-Type": "application/pdf",
    "Cache-Control": "no-store, max-age=0",
    "Content-Disposition": `attachment; filename="${transaction.name.toLowerCase().replace(" ", "-")}".pdf`
  }

  return new Response(blob, {headers});
};
