import { FormButton } from "@/components/form-button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Muted, Title } from "@/components/ui/typography"
import { selectCategoriesMin } from "@/models/category"

export const runtime = "edge";

const RawDataExportsPage = async () => {
  const categories = await selectCategoriesMin();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Reports</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Raw data exports</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Title>Raw data exports</Title>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Generate report</CardTitle>
        </CardHeader>
        <CardContent>
          <form method="GET" action="/reports/raw-data-exports/export.csv">
            <Label htmlFor="categoryId">Category</Label>
            <Select name="categoryId">
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category, idx) => (
                    <SelectItem key={idx} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Muted className="mb-4">Leave blank to export all transactions.</Muted>

            <Label htmlFor="date">Date range</Label>
            <DateRangePicker />

            <FormButton type="submit" className="mt-4">Generate report</FormButton>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default RawDataExportsPage;