import { Button } from "@/components/ui/button";
import { WidgetCard, WidgetCardTitle } from "@/components/widget-card";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { DownloadIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

const DashboardQuickLinksWidget = () => {
  return (
    <WidgetCard className="md:col-span-2">
      <WidgetCardTitle>Quick actions</WidgetCardTitle>

      <Button className="mt-2 w-full" asChild variant="dark">
        <Link href="/cashbook/create">
          <PlusIcon className="!size-4" />
          Add a payment
        </Link>
      </Button>
      <Button
        className="bg-background p-3 mt-2 text-sm border whitespace-normal items-end hover:underline hover:bg-background/50 w-full relative overflow-hidden"
        asChild
        variant={null}
        size={null}
      >
        <Link
          href={`/reports/account-summary/report?charity=on&club=on&from=${format(
            startOfMonth(new Date()),
            "yyyy-MM-dd",
          )}&to=${format(endOfMonth(new Date()), "yyyy-MM-dd")}`}
        >
          <div className="absolute -left-px -top-px right-0 bottom-0 bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent via-background via-70% to-background"></div>
          <span className="w-full whitespace-normal relative">
            Generate a monthly account summary for either your charity and club
            account.
          </span>
          <DownloadIcon className="size-4 text-muted-foreground relative" />
        </Link>
      </Button>
      <Button
        className="bg-background p-3 mt-2 text-sm border whitespace-normal items-end hover:underline hover:bg-background/50 w-full relative overflow-hidden"
        asChild
        variant={null}
        size={null}
      >
        <Link href="">
          <div className="absolute -left-px -top-px right-0 bottom-0 bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-bl from-transparent via-background via-70% to-background"></div>
          <span className="w-full whitespace-normal relative">
            Download this month&apos;s transactions and transfers in a printable
            report.
          </span>
          <DownloadIcon className="size-4 text-muted-foreground relative" />
        </Link>
      </Button>
      <Button
        className="bg-background p-3 mt-2 text-sm border whitespace-normal items-end hover:underline hover:bg-background/50 w-full relative overflow-hidden"
        asChild
        variant={null}
        size={null}
      >
        <Link href="">
          <div className="absolute -left-px -top-px right-0 bottom-0 bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-background via-70% to-background"></div>
          <span className="w-full whitespace-normal relative">
            Export all transactions and transfers in an Excel spreadsheet
            format.
          </span>
          <DownloadIcon className="size-4 text-muted-foreground relative" />
        </Link>
      </Button>
    </WidgetCard>
  );
};

export default DashboardQuickLinksWidget;
