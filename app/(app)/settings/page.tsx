import { FormButton } from "@/components/form-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Muted, Heading, Title } from "@/components/ui/typography";
import { selectCurrentOrganisation } from "@/models/organisation";
import { Metadata } from "next";
import {
  addFinancialYear,
  invite,
  makeFinancialYearCurrent,
  updateOrganisation,
} from "./actions";
import { format } from "date-fns";
import { CalendarIcon, CircleSmallIcon, PoundSterlingIcon } from "lucide-react";
import { SettingsIcon } from "@/components/icons/settings";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Settings" };

const SettingsPage = async () => {
  const organisation = await selectCurrentOrganisation();

  return (
    <>
      <Title icon={SettingsIcon}>Settings</Title>

      <div className="max-w-2xl">
        <Heading>Organisation</Heading>
        <Muted>
          Manage your organisation details. Any changes will be reflected across
          all the app and on all reports, affecting all members of the
          organisation.
        </Muted>

        <form action={updateOrganisation} className="w-full mt-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={organisation.name}
            className="mt-1 w-full mb-4"
          />

          <Label htmlFor="endOfFinancialYear">End of financial year</Label>
          <Input
            id="endOfFinancialYear"
            name="endOfFinancialYear"
            type="date"
            required
            defaultValue={format(organisation.endOfFinancialYear, "yyyy-MM-dd")}
            className="mt-1 w-full min-w-[28rem] mb-4"
          />

          <Label htmlFor="initialCharityBalance">Initial charity balance</Label>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 pl-2 flex items-center">
              <PoundSterlingIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="initialCharityBalance"
              name="initialCharityBalance"
              type="number"
              step={0.01}
              defaultValue={organisation.initialCharityBalance?.toString()}
              className="mt-1 w-full mb-4 pl-7"
            />
          </div>

          <Label htmlFor="initialClubBalance">Initial club balance</Label>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 pl-2 flex items-center">
              <PoundSterlingIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="initialClubBalance"
              name="initialClubBalance"
              type="number"
              step={0.01}
              defaultValue={organisation.initialClubBalance?.toString()}
              className="mt-1 w-full mb-4 pl-7"
            />
          </div>

          <Label htmlFor="initialDutchBalance">
            Initial Dutch visit balance
          </Label>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 pl-2 flex items-center">
              <PoundSterlingIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="initialDutchBalance"
              name="initialDutchBalance"
              type="number"
              step={0.01}
              defaultValue={organisation.initialDutchBalance?.toString()}
              className="mt-1 w-full mb-4 pl-7"
            />
          </div>

          <Label htmlFor="themeColour">Theme colour</Label>
          <Input
            id="themeColour"
            name="themeColour"
            type="color"
            defaultValue={organisation.themeColour || ""}
            className="mt-1 w-full mb-4"
          />

          <FormButton type="submit">Save</FormButton>
        </form>

        <hr className="my-6" />

        <div className="rounded-2xl p-3 border bg-muted/50 group">
          <div className="flex gap-2 items-center">
            <div className="bg-gradient-to-br size-7 rounded-lg grid place-items-center via-50% via-foreground from-foreground/70 to-foreground/70">
              <CalendarIcon className="size-4 text-background" />
            </div>
            <h3 className="font-medium text-xl flex-1">Financial years</h3>
          </div>

          <p className="text-sm text-muted-foreground mt-2">
            Manage your financial years to affect all reports and transactions.
            You can start a new financial year at any time, which will
            automatically close the previous year.
          </p>

          <div className="rounded-lg border bg-background overflow-hidden mt-3">
            <Table>
              <TableHeader className="bg-background">
                <TableRow>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organisation.financialYears.map((financialYear, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      {format(financialYear.startDate, "E, dd MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(financialYear.endDate, "E, dd MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      {financialYear.isCurrent ? <Badge>Current</Badge> : ""}
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <form action={makeFinancialYearCurrent}>
                        <input
                          type="hidden"
                          name="financialYearId"
                          value={financialYear.id}
                        />
                        <input
                          type="hidden"
                          name="organisationId"
                          value={organisation.id}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          title="Make current"
                          type="submit"
                          className={cn(
                            "h-8 w-8 p-0 text-muted-foreground",
                            financialYear.isCurrent &&
                              "opacity-50 pointer-events-none",
                          )}
                          disabled={financialYear.isCurrent ? true : false}
                        >
                          <span className="sr-only">Open menu</span>
                          <CircleSmallIcon className="h-4 w-4" />
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <form
            action={addFinancialYear}
            className="rounded-lg bg-background border p-3 mt-3 flex items-center gap-2"
          >
            <h4 className="font-medium shrink-0 flex-1">Add financial year</h4>
            <input
              type="hidden"
              name="organisationId"
              defaultValue={organisation.id}
            />

            <DateRangePicker />
            <FormButton type="submit">Add</FormButton>
          </form>
        </div>

        <hr className="my-6" />

        <Heading>Invite user</Heading>

        <form action={invite} className="w-full mt-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            required
            className="mt-1 w-full mb-4"
          />

          <FormButton type="submit">Invite</FormButton>
        </form>
      </div>
    </>
  );
};

export default SettingsPage;
