import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Title } from "@/components/ui/typography";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { formatSize, getFileUrl } from "@/utils/files";
import { EyeIcon, FilesIcon } from "lucide-react";
import Link from "next/link";

const FilesPage = async () => {
  const organisation = await selectCurrentOrganisation();
  const financialYear = organisation.financialYears.find((fy) => fy.isCurrent);

  const files = await db.query.filesTable.findMany({
    where: (fields, { and, eq }) =>
      and(
        eq(fields.organisationId, organisation.id),
        financialYear
          ? eq(fields.financialYearId, financialYear.id)
          : undefined,
      ),
    with: { transactions: true },
  });

  return (
    <>
      <Title icon={FilesIcon}>Documents</Title>

      <div className="rounded-2xl overflow-x-scroll border">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>File</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Transaction</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file, key) => (
              <TableRow key={key}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{formatSize(parseInt(file.size || ""))}</TableCell>
                <TableCell className="capitalize">{file.type}</TableCell>
                <TableCell>
                  <Button size={null} variant="link" asChild>
                    <Link
                      href={`/cashbook/transactions/${file.transactions[0].id}`}
                    >
                      {file.transactions[0].name}
                    </Link>
                  </Button>
                </TableCell>
                <TableCell className="flex justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 p-0 text-muted-foreground"
                    asChild
                  >
                    <Link href={getFileUrl(file.key)} download>
                      <span className="sr-only">Open</span>
                      <EyeIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FilesPage;
