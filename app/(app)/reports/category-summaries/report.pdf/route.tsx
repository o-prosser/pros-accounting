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
import { z } from "zod";
import { createTw } from "react-pdf-tailwind";
import { format } from "date-fns";
import PdfLogo from "@/components/pdf-logo";

const GeneralSansRegular =
  "https://pros-accounting.vercel.app/GeneralSans-Regular.ttf";
const GeneralSansMedium =
  "https://pros-accounting.vercel.app/GeneralSans-Medium.ttf";
  const GeneralSansBold =
  "https://pros-accounting.vercel.app/GeneralSans-Bold.ttf";
const Mono = "https://owenprosser.co.uk/fonts/PoeVeticaMonospace-6B7Y.ttf";

Font.register({
  family: "GeneralSansMedium",
  src: GeneralSansMedium
})

Font.register({
  family: "GeneralSansBold",
  src: GeneralSansBold,
})

Font.register({
  family: "General Sans",
  fonts: [
    {
      src: GeneralSansRegular,
      fontWeight: "normal",
    },
    {
      src: GeneralSansMedium,
      fontWeight: "medium",
    },
    {
      src: "https://pros-accounting.vercel.app/GeneralSans-Bold.ttf",
      fontWeight: "bold"
    }
  ],
});

Font.register({
  family: "Mono",
  fontWeight: 400,
  src: Mono,
});

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["General Sans"],
      mono: ["Mono"],
    },
    colors: {
      gray: "#a3a3a3"
    }
  },
});

const schema = z.object({
  categoryId: z.string().length(36),
  from: z.string().max(100),
  to: z.string().max(100),
});

export const GET = async (request: NextRequest) => {
  const fields = schema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams)
  );

  if (!fields.success) throw new Error();

  const organisation = await selectCurrentOrganisation();

  const category = await db.query.categoriesTable.findFirst({
    where: (columns, { eq, and }) =>
      and(
        eq(columns.organisationId, organisation.id),
        eq(columns.id, fields.data.categoryId)
      ),
    with: {
      subCategories: true,
    },
  });
  if (!category) throw new Error();

  const transactions = await db.query.transactionsTable.findMany({
    where: (column, { and, eq, lt, gt }) =>
      and(
        eq(column.categoryId, fields.data.categoryId),
        lt(column.date, new Date(fields.data.to)),
        gt(column.date, new Date(fields.data.from))
      ),
    columns: {
      id: true,
      income: true,
      expense: true,
      subCategoryId: true,
    },
  });

  // console.log(transactions);

  const total = (subCategory: string | null, type: "income" | "expense") => {
    const filtered = transactions
      .filter((transaction) => {
        const transactionType =
          transaction.income !== null ? "income" : "expense";
        if (
          subCategory
            ? transaction.subCategoryId === subCategory
            : true && type === transactionType
        )
          return true;
      })
      .map((transaction) => transaction[type]);

    const total = filtered.reduce(
      (total, current) => total + parseFloat(current || ""),
      0
    );

    return total;
  };

  const buffer = await renderToBuffer(
    <Document>
      <Page size="A4" style={tw("font-sans text-[12pt] p-[2cm]")}>
        <Text style={tw("text-[20pt] font-sans")}>Rotary Club of Crickhowell</Text>

        <Text style={{ fontFamily: "General Sans", ...tw("text-[16pt]") }}>
          Summary of transactions &mdash; {category.name}
        </Text>

        <Text style={tw("pt-4")}>
          Period {format(new Date(fields.data.from), "dd/MM/yyyy")} to{" "}
          {format(new Date(fields.data.to), "dd/MM/yyyy")}
        </Text>

        <View style={tw("mt-10")}>
          <View style={tw("flex flex-row border-b pb-1")}>
            <View style={tw("w-1/2")}></View>
            <View style={tw("w-1/4 text-right font-medium uppercase text-[10pt]")}>
              <Text>Income</Text>
            </View>
            <View style={tw("w-1/4 text-right font-medium uppercase text-[10pt]")}>
              <Text>Expense</Text>
            </View>
          </View>
          {category.subCategories.map((subCategory, idx) => (
            <View style={tw("flex flex-row py-3 border-b-[0.5px]")} key={idx}>
              <View style={tw("w-1/2")}>
                <Text>{subCategory.name}</Text>
              </View>
              <View style={tw("w-1/4 text-right")}>
                <Text>
                  {Number.isNaN(total(subCategory.id, "income"))
                    ? ""
                    : new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                      }).format(total(subCategory.id, "income"))}
                </Text>
              </View>
              <View style={tw("w-1/4 text-right")}>
              <Text>
                  {Number.isNaN(total(subCategory.id, "expense"))
                    ? ""
                    : new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                      }).format(total(subCategory.id, "expense"))}
                </Text>
              </View>
            </View>
          ))}
          <View style={tw("flex flex-row py-3")}>
            <View style={tw("w-1/2")}>
              <Text style={tw("font-sans font-bold")}>Total</Text>
            </View>
            <View style={tw("w-1/4 text-right")}>
                <Text>
                  {Number.isNaN(total(null, "income"))
                    ? "£0.00"
                    : new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                      }).format(total(null, "income"))}
                </Text>
              </View>
              <View style={tw("w-1/4 text-right")}>
              <Text>
                  {Number.isNaN(total(null, "expense"))
                    ? "£0.00"
                    : new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                      }).format(total(null, "expense"))}
                </Text>
              </View>
          </View>
          <View style={tw("flex flex-row")}>
          <View style={tw("w-1/2")}></View>
            <View style={tw("w-1/4 text-right py-3 border-t")}>
              <Text style={tw("font-sans font-bold uppercase")}>{total(null, "income") - total(null, "income") > 0 ? "Profit" : "Loss"}</Text>
              </View>
              <View style={tw("w-1/4 text-right py-3 border-t")}>
              <Text>
                  {new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                      }).format(total(null, "income") - total(null, "expense"))}
                </Text>
              </View>
          </View>
        </View>

        <View fixed style={tw("absolute w-screen left-0 bottom-0 right-0 p-[2cm] pt-0 flex flex-row justify-between")}>
          <PdfLogo />
          <Text style={tw("text-[10pt]")} render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} of ${totalPages}`
          )} />
        </View>
      </Page>
    </Document>
  );

  // res.setHeader("Content-Type", "application/pdf");
  // res.setHeader("Content-disposition", 'attachment;filename="filename.pdf"');
  // res.send(pdfStream);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-disposition": 'attachment;filename="ParticipantList.pdf"',
    },
  });
};
