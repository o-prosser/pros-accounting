import LoadingIndicator from "@/components/loading-indicator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectCurrentOrganisation } from "@/models/organisation";
import { format, isPast } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

const DashboardFinancialYearPicker = async ({
  financialYear,
}: {
  financialYear?: { id: string; startDate: Date; endDate: Date };
}) => {
  const organisation = await selectCurrentOrganisation();

  return organisation.financialYears.filter((fy) => fy.isCurrent === true)
    .length > 0 ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-auto place-self-end">
          {format(financialYear?.startDate || new Date(), "MMM yyyy")} &mdash;{" "}
          {isPast(financialYear?.endDate || new Date())
            ? format(financialYear?.endDate || new Date(), "MMM yyyy")
            : "present"}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Financial years</DropdownMenuLabel>
        <DropdownMenuGroup>
          {organisation.financialYears.map((fy, key) => (
            <DropdownMenuItem asChild key={key}>
              <Link href={`/dashboard?fy=${fy.id}`}>
                <div className="size-1.5 bg-popover-foreground/80 rounded-full mr-2"></div>
                {format(fy.startDate, "d MMMM yyyy")} &ndash;{" "}
                {format(fy.endDate, "d MMMM yyyy")}
                <LoadingIndicator />
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    ""
  );
};

export default DashboardFinancialYearPicker;
