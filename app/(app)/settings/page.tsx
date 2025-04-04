import { FormButton } from "@/components/form-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Muted, Heading, Title } from "@/components/ui/typography";
import { selectCurrentOrganisation } from "@/models/organisation";
import { Metadata } from "next";
import { addFinancialYear, invite, updateOrganisation } from "./actions";
import { format } from "date-fns";
import { PoundSterlingIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SettingsIcon } from "@/components/icons/settings";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export const metadata: Metadata = { title: "Settings" };

const SettingsPage = async () => {
  const organisation = await selectCurrentOrganisation();

  return (
    <>
      {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Settings</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}

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

        <div className="max-w-2xl">
          <Heading>Financial years</Heading>

          <div className="rounded-md border">

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organisation.financialYears.map((financialYear, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      {format(financialYear.startDate, "E, dd MMM")} &ndash;{" "}
                      {format(financialYear.endDate, "E, dd MMM")}
                    </TableCell>
                    <TableCell>
                      {financialYear.isCurrent ? (
                        
                        <Badge>Current</Badge>
                      ) : ""}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Add financial year</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={addFinancialYear}>
                <input type="hidden" name="organisationId" defaultValue={organisation.id} />

                <Label>Period</Label>
                <DateRangePicker className="mb-6" />

                <FormButton type="submit">Add</FormButton>
              </form>
            </CardContent>
          </Card>
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
