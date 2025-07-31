"use client";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { ToggleButton } from "@/components/ui/toggle-button";
import { endOfMonth, startOfMonth } from "date-fns";

const AccountSummaryForm = ({
  organisation,
}: {
  organisation: {
    financialYears: {
      isCurrent: boolean | null;
      startDate?: Date;
      endDate?: Date;
    }[];
  };
}) => {
  return (
    <form
      method="GET"
      action="/reports/account-summary/report"
      className="mt-6"
    >
      <Label>Accounts</Label>
      <div className="justify-start flex items-center gap-1 mb-6">
        <ToggleButton
          label={
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full flex-shrink-0 bg-orange-600" />
              Charity
            </div>
          }
          name="charity"
          defaultChecked
        />
        <ToggleButton
          label={
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full flex-shrink-0 bg-cyan-600" />
              Club
            </div>
          }
          name="club"
          defaultChecked
        />
      </div>

      <Label htmlFor="date">Date</Label>
      <DateRangePicker
        className="mb-6"
        defaultFrom={startOfMonth(new Date())}
        defaultTo={endOfMonth(new Date())}
      />

      {/* <Label>Columns</Label>
      <div className="justify-start flex items-center gap-1 mb-6">
        <ToggleButton label="Name" name="name" defaultChecked />
        <ToggleButton label="Date" name="date" defaultChecked />
        <ToggleButton label="Account" name="account" defaultChecked />
        <ToggleButton label="Category" name="category" defaultChecked />
        <ToggleButton label="Amount" name="amount" defaultChecked />
      </div> */}

      <Button>Generate report</Button>
    </form>
  );
};

export default AccountSummaryForm;
