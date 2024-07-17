"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const SelectCategory = ({categories}: {categories: {id: string; name: string; subCategories: {id: string; name: string}[]}[]}) => {
  const [selected, setSelected]= useState<string|undefined>();

  return (
    <>
        <Label htmlFor="category">Category</Label>
        <Select name="category" onValueChange={setSelected} defaultValue={selected} >
          <SelectTrigger className="mt-1 w-full max-w-lg mb-6">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((category,idx) => (
                <SelectItem value={category.id} key={idx}>{category.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {(selected && ((categories.find((c) => c.id === selected)?.subCategories?.length || 0) > 0)) ? (
          <>
          <Label htmlFor="subCategory">Sub category</Label>
          <Select name="subCategory">
            <SelectTrigger className="mt-1 w-full max-w-lg mb-6">
              <SelectValue placeholder="Select a sub category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.find(c => c.id === selected)?.subCategories.map((subCategory,idx) => (
                  <SelectItem value={subCategory.id} key={idx}>{subCategory.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          </>
        ) : ""}
    </>
  )
}

export default SelectCategory