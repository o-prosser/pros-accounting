"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useState } from "react";
import { FormButton } from "@/components/form-button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { SelectCategory, SelectTransaction } from "@/drizzle/schema";
import { colours } from "@/utils/colours";
import { updateCategoryAction } from "../actions";

const EditCategoryForm = ({ category }: { category: SelectCategory }) => {
  const router = useRouter();

  const [state, formAction] = useActionState(updateCategoryAction, {
    success: false,
    errors: null,
  });

  useEffect(() => {
    if (state.success === true) {
      toast({
        title: "Category updated successfully",
        description: "The category has been updated.",
        variant: "success",
      });
      router.back();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="id" defaultValue={category.id} />

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          required
          defaultValue={category.name}
          className="mt-0.5 w-full"
        />
      </div>

      <div className="mt-3">
        <Label htmlFor="colour">Colour</Label>
        <Select name="colour" defaultValue={category.colour || undefined}>
          <SelectTrigger className="mt-0.5 w-full">
            <SelectValue placeholder="Select a theme colour" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {colours.map((colour, idx) => (
                <SelectItem key={idx} value={colour.name}>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: colour.foreground }}
                    />
                    <span className="capitalize">{colour.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex justify-end">
        <FormButton>Update category</FormButton>
      </div>
    </form>
  );
};

export default EditCategoryForm;
