import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { selectCategories } from "@/models/category";
import CreateSubCategory from "../[id]/_components/sub-categories/create";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { format, formatDistance, formatRelative } from "date-fns";
import { getColour } from "@/utils/colours";
import clsx from "clsx";
import { Caption } from "@/components/ui/typography";

const CategoriesIndex = async () => {
  const categories = await selectCategories();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {categories.map((category, idx) => {
        const total = (type: "income" | "expense") => {
          const filtered = category.transactions
            .filter((transaction) => {
              const transactionType =
                transaction.income !== null ? "income" : "expense";
              if (type === transactionType) return true;
            })
            .map((transaction) => transaction[type]);

          const total = filtered.reduce(
            (total, current) => total + parseFloat(current || ""),
            0,
          );

          return total;
        };

        return (
          <Card
            key={idx}
            style={{
              borderColor: getColour(category.colour).foreground,
              backgroundColor: getColour(category.colour).background,
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: getColour(category.colour).foreground,
                  }}
                />
                <span className="flex-1">{category.name}</span>
                <div className="flex items-center gap-1">
                  <div
                    className={clsx(
                      "h-2 w-2 rounded-full flex-shrink-0",
                      category.account === "club"
                        ? "bg-cyan-600"
                        : "bg-orange-600",
                    )}
                  />
                  <span className="capitalize text-sm font-medium">
                    {category.account}
                  </span>
                </div>
              </CardTitle>
              <CardDescription>
                Last updated{" "}
                {formatDistance(
                  category.lastUpdated || category.createdAt || new Date(),
                  new Date(),
                )}{" "}
                ago
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <div className="grid first:!rounded-t-lg last:!rounded-b-lg">
              {category.subCategories.map((subCategory, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="justify-between rounded-none first:rounded-t-lg last:rounded-b-lg -mb-px group"
                  asChild
                >
                  <Link href={`/categories/${category.id}/${subCategory.id}`}>
                    {subCategory.name}
                    <ArrowRightIcon className="text-muted-foreground !h-4 !w-4 group-hover:translate-x-1 transition duration-100" />
                  </Link>
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-2 mt-4 gap-4">
              <CreateSubCategory category={category} />
              <Button asChild>
                <Link href={`/categories/${category.id}`}>View category</Link>
              </Button>
            </div> */}

              <div className="flex items-end gap-1">
                <p className="text-3xl font-mono font-semibold tracking-tight pr-1">
                  {category.transactions.length}
                </p>
                <Caption>
                  transaction{category.transactions.length !== 1 ? "s" : ""}
                </Caption>
              </div>

              {total("income") == total("expense") ? (
                ""
              ) : (
                <div className="flex items-end gap-1 mt-2">
                  <p className="text-3xl font-mono font-semibold tracking-tight pr-1">
                    {total("income") > total("expense") ? "+" : ""}
                    {new Intl.NumberFormat("en-GB", {
                      style: "currency",
                      currency: "GBP",
                    }).format(total("income") - total("expense"))}
                  </p>
                  <Caption>
                    {total("income") > total("expense") ? "profit" : "loss"}
                  </Caption>
                </div>
              )}

              <div className="flex justify-end -mr-3 -mb-2">
                <Button asChild variant={null} size="sm" className="group">
                  <Link href={`/categories/${category.id}`}>
                    View transactions{" "}
                    <ArrowRightIcon
                      className="h-4 w-4 ml-2 group-hover:translate-x-1 transition duration-100"
                      style={{ color: getColour(category.colour).foreground }}
                    />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CategoriesIndex;
