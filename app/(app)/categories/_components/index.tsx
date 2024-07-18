import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { selectCategories } from "@/models/category"
import CreateSubCategory from "./sub-categories/create";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { format, formatRelative } from "date-fns";

const CategoriesIndex = async () => {
  const categories = await selectCategories();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {categories.map((category, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>
              <Badge variant={`outline-accent${category.account === 'charity' ? "1":"2"}`}>{category.account}</Badge>
              <span className="pl-1.5">{category.name}</span>
            </CardTitle>
            <CardDescription>
              Last updated {format(category.lastUpdated || new Date, "dd MMM yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid first:!rounded-t-lg last:!rounded-b-lg">
              {category.subCategories.map((subCategory, idx) => (
                <Button key={idx} variant="outline" className="justify-between rounded-none first:rounded-t-lg last:rounded-b-lg -mb-px group" asChild><Link href={`/categories/${category.id}/${subCategory.id}`}>{subCategory.name}<ArrowRightIcon className="text-muted-foreground !h-4 !w-4 group-hover:translate-x-1 transition duration-100" /></Link></Button>
              ))}
            </div>

            <div className="grid grid-cols-2 mt-4 gap-4">
              <CreateSubCategory category={category} />
              <Button asChild>
                <Link href={`/categories/${category.id}`}>View category</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default CategoriesIndex