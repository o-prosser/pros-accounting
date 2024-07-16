import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { selectCategories } from "@/models/category"
import CreateSubCategory from "./sub-categories/create";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

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
              Last updated DD/MM/YYYY
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {category.subCategories.map((subCategory, idx) => (
                <Button variant="outline" className="justify-between" asChild><Link href="#">{subCategory.name}<ArrowRightIcon className="text-muted-foreground" /></Link></Button>
              ))}

              <CreateSubCategory category={category} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default CategoriesIndex