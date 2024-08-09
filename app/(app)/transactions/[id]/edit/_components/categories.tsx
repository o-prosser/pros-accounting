"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const SelectCategory = ({categoryId, subCategoryId, categories}: {categoryId: string; subCategoryId: string |null, categories: {id: string; name: string; account: "charity"|"club", subCategories: {id: string; name: string}[]}[]}) => {
  const [selected, setSelected]= useState<string|undefined>(categoryId);

  return (
    <>
      <input
        type="hidden"
        name="account"
        defaultValue={categories.find((c) => c.id === selected)?.account}
      />

      <Label htmlFor="category">Category</Label>
      <Select
        name="category"
        onValueChange={setSelected}
        defaultValue={selected}
      >
        <SelectTrigger className="mt-1 w-full max-w-lg mb-6">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((category, idx) => (
              <SelectItem value={category.id} key={idx}>
                <Badge
                  className="mr-2 py-0 leading-none px-1 mb-px text-[0.625rem]"
                  variant={`outline-accent${
                    category.account === "charity" ? "1" : "2"
                  }`}
                >
                  {category.account}
                </Badge>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {selected &&
      (categories.find((c) => c.id === selected)?.subCategories?.length || 0) >
        0 ? (
        <>
          <Label htmlFor="subCategory">Sub category</Label>
          <Select name="subCategory" defaultValue={subCategoryId || ""}>
            <SelectTrigger className="mt-1 w-full max-w-lg mb-6">
              <SelectValue placeholder="Select a sub category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories
                  .find((c) => c.id === selected)
                  ?.subCategories.map((subCategory, idx) => (
                    <SelectItem value={subCategory.id} key={idx}>
                      {subCategory.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default SelectCategory