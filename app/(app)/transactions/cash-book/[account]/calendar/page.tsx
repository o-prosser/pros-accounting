import { Metadata } from "next";
import { selectTransactions } from "@/models/transaction";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  isSameDay,
  isToday,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Calendar | Transactions" };

export const runtime = "edge";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TransactionsCalendarPage = async ({
  searchParams,
  params
}: {
  searchParams: { [key: string]: string };
  params: {account: string};
}) => {
  const account =
    params.account === "club"
      ? "club"
      : params.account === "charity"
      ? "charity"
      : null;

  if (!searchParams.date) redirect(`/transactions/cash-book/${params.account}/calendar?date=${format(new Date(), "yyyy-MM-dd")}`)
  const activeDate = new Date(searchParams.date);

  const transactions = await selectTransactions({ account });

  const firstDayOfCurrentMonth = startOfMonth(activeDate);
  const lastDayOfCurrentMonth = endOfMonth(activeDate);

  const days = eachDayOfInterval({
    start: firstDayOfCurrentMonth,
    end: lastDayOfCurrentMonth,
  }).map((d) => ({ isPrevious: false, isNext: false, date: d }));

  const weekDayOfStartDate = days[0].date.getDay();
  const weekDayOfEndDate = days[days.length - 1].date.getDay();

  const lastMondayOfMonth = subDays(
    firstDayOfCurrentMonth,
    weekDayOfStartDate === 0 ? 6 : weekDayOfStartDate - 1,
  );

  const daysInPreviousMonth =
    weekDayOfStartDate == 1
      ? []
      : eachDayOfInterval({
          start: lastMondayOfMonth,
          end: endOfMonth(lastMondayOfMonth),
        }).map((d) => ({ isPrevious: true, isNext: false, date: d }));

  const lastDayOfWeekInNextMonth = endOfWeek(days[days.length - 1].date, {
    weekStartsOn: 1,
  });


  const daysInNextMonth =
    weekDayOfEndDate == 0
      ? []
      : eachDayOfInterval({
          start: addDays(days[days.length - 1].date, 1),
          end: lastDayOfWeekInNextMonth,
        }).map(d => ({isPrevious: false, isNext: true, date: d}))

  const allDays = [...daysInPreviousMonth, ...days, ...daysInNextMonth];

  return (
    <>
      <div className="flex gap-2 mb-6 items-center">
        <Button variant="outline" asChild>
          <Link href={`/transactions/cash-book/${params.account}/calendar?date=${format(new Date(), "yyyy-MM-dd")}`}>Today</Link>
        </Button>

        <Heading className="mb-0 text-lg ml-2">{format(activeDate, "LLLL yyyy")}</Heading>

        <div className="flex-1"></div>

        <Button variant="outline" asChild size="icon" className="rounded-full">
          <Link href={`/transactions/cash-book/${params.account}/calendar?date=${format(subMonths(activeDate, 1), "yyyy-MM-dd")}`}><ChevronLeftIcon /></Link>
        </Button>

        <Button variant="outline" asChild size="icon" className="rounded-full">
          <Link href={`/transactions/cash-book/${params.account}/calendar?date=${format(addMonths(activeDate, 1), "yyyy-MM-dd")}`}><ChevronRightIcon /></Link>
        </Button>
      </div>

      <div className="grid grid-cols-7 rounded-md border overflow-hidden">
        {/* Days of week */}
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
          <div
            className={clsx(
              "bg-muted uppercase font-medium py-3 text-center text-sm text-muted-foreground tracking-wide",
              idx !== 6 && "border-r",
            )}
            key={idx}
          >
            {day}
          </div>
        ))}

        {allDays.map((day, idx) => (
          <div
            className={clsx(
              "p-2 border-t min-h-40",
              (idx + 1) % 7 !== 0 && "border-r",
              (day.isNext || day.isPrevious) && "bg-muted/50",
            )}
            key={idx}
          >
            <div
              className={clsx(
                "text-sm",
                isToday(day.date) ? "font-medium" : "text-muted-foreground",
              )}
            >
              {(day.date.getDate() === 1 || idx === 0) ? monthNames[day.date.getMonth()] : ""}{" "}
              {day.date.getDate()}
            </div>

            <div className="space-y-2 mt-2">
              {transactions.filter((t) => isSameDay(t.date, day.date)).map((transaction, idx) => (
                <Button key={idx} asChild variant="link" size={null} className="whitespace-normal">
                  <Link href={`/transactions/${transaction.id}`}>{transaction.name}</Link>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionsCalendarPage;
