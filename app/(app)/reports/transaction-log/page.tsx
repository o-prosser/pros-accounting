import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import {  Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import { FormButton } from "@/components/form-button";
import SelectFields from "./_components/select";

export const runtime = "edge";

const CategorySummariesPage = async () => {
  const categories = await selectCategoriesMin();

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

      <Title>Transaction log</Title>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Generate report</CardTitle>
        </CardHeader>
        <CardContent>
          <form method="GET" action="/reports/transaction-log/report">
            <SelectFields categories={categories} />

            <Label htmlFor="date">Date range</Label>
            <DateRangePicker />

            <FormButton type="submit" className="mt-4">
              Generate report
            </FormButton>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CategorySummariesPage;
