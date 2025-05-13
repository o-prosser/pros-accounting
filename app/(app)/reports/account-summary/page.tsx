import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { Caption, Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import { FormButton } from "@/components/form-button";
import SelectFields from "./_components/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import AccountSummaryForm from "./form";
import { selectCurrentOrganisation } from "@/models/organisation";

export const runtime = "edge";

const AccountSummaryPage = async () => {
  const categories = await selectCategoriesMin();
  const organisation = await selectCurrentOrganisation();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Reports</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Account summary</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Title className="mb-0">Generate an account summary</Title>

      <Caption>
        Choose which accounts to include, and the date range.
      </Caption>

     <AccountSummaryForm organisation={organisation} />
    </>
  );
};

export default AccountSummaryPage;
