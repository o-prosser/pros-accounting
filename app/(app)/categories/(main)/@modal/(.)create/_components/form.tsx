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
import { colours } from "@/utils/colours";
import { createCategoryAction } from "../actions";

const AddCategoryForm = () => {
  const router = useRouter();

  const [state, formAction] = useActionState(createCategoryAction, {
    success: false,
    errors: null,
  });

  useEffect(() => {
    if (state.success === true) {
      toast({
        title: "Category added successfully",
        description: "The category has been added to this financial year.",
        variant: "success",
      });
      router.back();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="w-full">
      {state.errors ? (
        <div className="rounded-lg border border-red-500 p-3 bg-red-500/10 text-sm text-red-500 mt-3">
          {state.errors}
        </div>
      ) : (
        ""
      )}

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          required
          className="mt-0.5 w-full"
        />
      </div>

      <div className="mt-3">
        <Label htmlFor="colour">Colour</Label>
        <Select name="colour">
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
        <FormButton>Add category</FormButton>
      </div>
    </form>
  );
};

export default AddCategoryForm;
