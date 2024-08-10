"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const SelectCategory = ({
  defaultValues,
  categories,
}: {
  defaultValues: { [key: string]: string };
  categories: {
    id: string;
    name: string;
    account: "charity" | "club";
    subCategories: { id: string; name: string }[];
  }[];
}) => {
  const [selected, setSelected] = useState<string | undefined>(
    defaultValues.category || undefined,
  );

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
            <SelectLabel>Charity account</SelectLabel>
            {categories
              .filter((c) => c.account === "charity")
              .map((category, idx) => (
                <SelectItem value={category.id} key={idx}>
                  {category.name}
                </SelectItem>
              ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Club account</SelectLabel>
            {categories
              .filter((c) => c.account === "club")
              .map((category, idx) => (
                <SelectItem value={category.id} key={idx}>
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
          <Select
            name="subCategory"
            defaultValue={defaultValues.subCategory || ""}
          >
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
};

export default SelectCategory;
