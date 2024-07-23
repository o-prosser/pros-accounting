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
import { toast } from "@/components/ui/use-toast";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";

const initialState = {
  success: false,
  newId: "",
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
      toast({
        title: "Category added successfully",
        description: "The category has beeen added.",
      });
    };
  }, [state?.success, state?.newId]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const Form = () => (
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
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon />
            <span className="hidden sm:inline">Add category</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add category</DialogTitle>
            <DialogDescription>
              Add the details of the new transaction category.
            </DialogDescription>
          </DialogHeader>
          <Form />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <PlusIcon />
          <span className="hidden sm:inline">Add category</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add category</DrawerTitle>
          <DrawerDescription>
            Add the details of the new transaction category.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <Form />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateCategory;
