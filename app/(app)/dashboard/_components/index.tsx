import { selectTransactions } from "@/models/transaction";
import { selectTransfers } from "@/models/transfer";
import { format, isAfter } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import { getColour } from "@/utils/colours";
import { currency } from "@/utils/currency";

export type Payment = {
  id: string;
  name: string | null;
  date: string | Date;
  account?: "club" | "charity" | "dutch" | null;
  income?: string | null;
  expense?: string | null;
  balance?: number;
  amount?: string;
  from?: "club" | "charity" | "dutch";
  to?: "club" | "charity" | "dutch";
  category?: {
    id: string;
    name: string;
    colour: string | null;
  } | null;
};

const Transactions = async ({
  financialYear,
}: {
  financialYear?: { id: string };
}) => {
  const transactions = await selectTransactions({
    account: null,
    financialYear,
  });
  const transfers = await selectTransfers({ financialYear });

  const payments: Payment[] = [...transactions, ...transfers].sort((a, b) =>
    isAfter(a.date, b.date) ? -1 : 1,
  );

  return (
    <div className="w-full max-w-full">
      <div className="rounded-2xl border overflow-x-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.slice(0, 8).map((payment, key) => (
              <TableRow key={key}>
                <TableCell>
                  <Button
                    asChild
                    variant="link"
                    className="group/link hover:no-underline"
                    size={null}
                  >
                    <Link
                      href={`/cashbook/${
                        payment.to ? "transfers" : `transactions`
                      }/${payment.id}`}
                    >
                      <span className="group-hover/link:underline">
                        {payment.name?.substring(0, 30)}
                        {payment.name?.length || 0 > 30 ? "..." : ""}
                      </span>
                      {payment.to ? (
                        <div className="text-muted-foreground flex ml-2 group-hover:!no-underline">
                          (
                          <div className="flex font-medium gap-1 items-center">
                            <div
                              className={clsx(
                                "h-2 w-2 rounded-full flex-shrink-0",
                                payment.from === "club"
                                  ? "bg-cyan-600"
                                  : payment.from === "charity"
                                  ? "bg-orange-600"
                                  : "bg-green-600",
                              )}
                            />
                            <span className="capitalize !no-underline">
                              {payment.from}
                            </span>

                            <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />

                            <div
                              className={clsx(
                                "h-2 w-2 rounded-full flex-shrink-0",
                                payment.to === "club"
                                  ? "bg-cyan-600"
                                  : payment.to === "charity"
                                  ? "bg-orange-600"
                                  : "bg-green-600",
                              )}
                            />
                            <span className="capitalize">{payment.to}</span>
                          </div>
                          )
                        </div>
                      ) : (
                        ""
                      )}
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  {format(new Date(payment.date), "dd MMM yyyy")}
                </TableCell>
                <TableCell>
                  {payment.account ? (
                    <div className="flex">
                      <div className={clsx(payment.to && "relative flex")}>
                        <div className="flex items-center gap-1">
                          <div
                            className={clsx(
                              "h-2 w-2 rounded-full flex-shrink-0",
                              payment.account === "club"
                                ? "bg-cyan-600"
                                : payment.account === "charity"
                                ? "bg-orange-600"
                                : "bg-green-600",
                            )}
                          />
                          <span className="capitalize">{payment.account}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>
                  {payment.category ? (
                    <div
                      className="rounded-full inline-flex border py-0.5 px-2 items-center gap-1 w-auto"
                      style={{
                        backgroundColor: getColour(payment.category.colour)
                          .background,
                        borderColor: getColour(payment.category.colour)
                          .foreground,
                      }}
                    >
                      <div
                        className="h-2 w-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: getColour(payment.category.colour)
                            .foreground,
                        }}
                      />
                      <span
                        className="font-medium flex-shrink-0"
                        style={{
                          color: getColour(payment.category.colour).foreground,
                        }}
                      >
                        {payment.category.name}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell
                  className={clsx(
                    "font-medium",
                    payment.income && "text-green-600",
                    payment.expense && "text-red-600",
                  )}
                >
                  {payment.income ? "+" : ""}
                  {payment.expense ? <>&ndash;</> : ""}
                  {currency(
                    payment.income !== null && payment.income !== undefined
                      ? parseFloat(payment.income)
                      : payment.expense !== null &&
                        payment.expense !== undefined
                      ? parseFloat(payment.expense)
                      : parseFloat(payment.amount || "0"),
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Transactions;
