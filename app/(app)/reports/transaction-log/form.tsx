"use client";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { ToggleButton } from "@/components/ui/toggle-button";

const TransactionLogForm = ({organisation}: {organisation: {financialYears: {isCurrent: boolean|null, startDate?: Date, endDate?: Date}[]}}) => {
  return (
    <form
      method="GET"
      action="/reports/transaction-log/report"
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
        <ToggleButton
          label={
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full flex-shrink-0 bg-green-600" />
              Dutch
            </div>
          }
          name="dutch"
          defaultChecked
        />
      </div>

      <Label htmlFor="date">Date</Label>
      <DateRangePicker
        className="mb-6"
        defaultFrom={
          organisation.financialYears.find((f) => f.isCurrent)?.startDate
        }
        defaultTo={
          organisation.financialYears.find((f) => f.isCurrent)?.endDate
        }
      />

      <Label>Columns</Label>
      <div className="justify-start flex items-center gap-1 mb-6">
        <ToggleButton label="Name" name="name" defaultChecked />
        <ToggleButton label="Date" name="date" defaultChecked />
        <ToggleButton label="Account" name="account" defaultChecked />
        <ToggleButton label="Category" name="category" defaultChecked />
        <ToggleButton label="Amount" name="amount" defaultChecked />
      </div>

      <Button>Generate report</Button>
    </form>
  );
};

export default TransactionLogForm;
