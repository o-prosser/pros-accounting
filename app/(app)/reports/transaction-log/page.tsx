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
import TransactionLogForm from "./form";
import { selectCurrentOrganisation } from "@/models/organisation";

export const runtime = "edge";

const CategorySummariesPage = async () => {
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
          <BreadcrumbItem>Transaction log</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Title className="mb-0">Generate a transaction log</Title>

      <Caption>
        Fitler the payments to include, and customise the look of the report.
      </Caption>

     <TransactionLogForm organisation={organisation} />
    </>
  );
};

export default CategorySummariesPage;
