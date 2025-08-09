import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import { FormButton } from "@/components/form-button";

export const runtime = "edge";

const CategorySummariesPage = async () => {
  const categories = await selectCategoriesMin();

  return (
    <>
      <Title>Category summaries</Title>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Generate report</CardTitle>
        </CardHeader>
        <CardContent>
          <form method="GET" action="/reports/category-summaries/report.pdf">
            <Label htmlFor="categoryId">Category</Label>
            <Select name="categoryId">
              <SelectTrigger className="mt-1 w-full mb-4">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category, idx) => (
                    <SelectItem key={idx} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

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
