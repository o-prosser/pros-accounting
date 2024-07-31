"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const SelectFields = ({
  categories,
}: {
  categories: {
    id: string;
    name: string;
    account: "charity" | "club";
    subCategories: { id: string; name: string }[];
  }[];
}) => {
  const [account, setAccount] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();

  return (
    <>
      <Label htmlFor="account">Account</Label>
      <Select name="account" onValueChange={setAccount} defaultValue={account}>
        <SelectTrigger className="mt-1 w-full max-w-lg mb-6">
          <SelectValue placeholder="Select an account (optional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="charity">Charity</SelectItem>
            <SelectItem value="club">Club</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {account ? (
        <>
          <Label htmlFor="categoryId">Category</Label>
          <Select
            name="categoryId"
            onValueChange={setCategory}
            defaultValue={category}
          >
            <SelectTrigger className="mt-1 w-full max-w-lg mb-6">
              <SelectValue placeholder="Select a category (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories
                  .filter(c => c.account === account)
                  .map((category, idx) => (
                    <SelectItem value={category.id} key={idx}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {category &&
          (categories.find((c) => c.id === category)?.subCategories?.length || 0) >
            0 ? (
            <>
              <Label htmlFor="subCategoryId">Sub category</Label>
              <Select
                name="subCategoryId"
              >
                <SelectTrigger className="mt-1 w-full max-w-lg mb-6">
                  <SelectValue placeholder="Select a sub category (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories
                      .find((c) => c.id === category)
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
      ) : ""}

    </>
  );
};

export default SelectFields;
