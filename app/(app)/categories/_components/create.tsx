"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { createCategoryAction } from "../actions";
import { FormButton } from "@/components/form-button";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";

const initialState = {
  success: false,
  errors: {
    name: [],
    account: [],
  },
};

const CreateCategory = () => {
  const [state, formAction] = useFormState(createCategoryAction, initialState);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success === true) {
      setOpen(false);
      formRef.current?.reset();
    };
  }, [state]);

  return (
    <ResponsiveDialog
      trigger={
        <Button>
          <PlusIcon />
          <span className="hidden sm:inline">Add category</span>
        </Button>
      }
      title="Add category"
      description="Add the details of the new transaction category."
      open={open}
      setOpen={setOpen}
    >
      <form action={formAction} ref={formRef}>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          required
          autoFocus
          className="mt-1 w-full mb-6"
        />

        <Label htmlFor="account">Account</Label>
        <Select name="account">
          <SelectTrigger className="mt-1 w-full mb-6">
            <SelectValue placeholder="Select an account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="charity">Charity</SelectItem>
              <SelectItem value="club">Club</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <FormButton type="submit">Add category</FormButton>
      </form>
    </ResponsiveDialog>
  );
};

export default CreateCategory;
