"use client";

import { Button } from "@/components/ui/button";
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
import { PlusIcon, PoundSterlingIcon } from "lucide-react";
import Link from "next/link";
import { FormButton } from "@/components/form-button";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Textarea } from "@/components/ui/textarea";
import { createTransferAction } from "../actions";

const initialState = {
  success: false,
  newId: "",
  errors: {
    id: [],
    date: [],
    from: [],
    to: [],
    amount: [],
    notes: [],
    organisationId: []
  },
};

const CreateTransfer = () => {
  const [state, formAction] = useFormState(createTransferAction, initialState);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success === true) {
      setOpen(false);
      formRef.current?.reset();
      toast({
        title: "Transfer added successfully",
        description: "The account transfer has beeen added.",
        variant: "success",
      });
    }
  }, [state?.success, state?.newId]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const Form = () => (
    <form action={formAction} ref={formRef}>
      <Label htmlFor="amount">Amount</Label>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 pl-2 flex items-center">
          <PoundSterlingIcon className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          id="amount"
          name="amount"
          type="number"
          autoComplete="off"
          autoFocus
          className="mt-1 w-full pl-7 mb-6"
          step="0.01"
        />
      </div>

      <Label htmlFor="date">Date</Label>
      <Input
        id="date"
        name="date"
        type="date"
        autoComplete="off"
        required
        className="mt-1 w-full min-w-[calc(100%-1rem)] mb-6"
      />

      <Label htmlFor="from">Moving from</Label>
      <Select name="from">
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

      <Label htmlFor="to">Moving to</Label>
      <Select name="to">
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

      <Label htmlFor="notes">Notes</Label>
      <Textarea id="notes" name="notes" className="mt-1 w-full mb-6" />

      <FormButton type="submit">Add transfer</FormButton>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon />
            <span className="hidden sm:inline">Add transfer</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add transfer</DialogTitle>
            <DialogDescription>
              Add the details of the new account transfer.
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
          <span className="hidden sm:inline">Add transfer</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add transfer</DrawerTitle>
          <DrawerDescription>
            Add the details of the new account transfer.
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

export default CreateTransfer;
