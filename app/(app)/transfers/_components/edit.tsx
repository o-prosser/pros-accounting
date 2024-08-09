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
import { PencilIcon, PlusIcon, PoundSterlingIcon } from "lucide-react";
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
import { createTransferAction, updateTransferAction } from "../actions";
import { format } from "date-fns";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const initialState = {
  success: false,
  updatedId: "",
  errors: {
    date: [],
    from: [],
    to: [],
    amount: [],
    notes: [],
    organisationId: [],
  },
};

const EditTransfer = ({
  transfer,
}: {
  transfer: {
    id: string;
    date: string | Date;
    from: "charity" | "club";
    to: "charity" | "club";
    amount: string;
    notes: string | null;
  };
}) => {
  const [state, formAction] = useFormState(updateTransferAction, initialState);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success === true) {
      setOpen(false);
      formRef.current?.reset();
      toast({
        title: "Transfer updated successfully",
        description: "The account transfer has beeen updated.",
        variant: "success",
      });
    }
  }, [state?.success, state?.updatedId]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const Form = () => (
    <form action={formAction} ref={formRef}>
      <input type="hidden" name="id" defaultValue={transfer.id} />

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
          defaultValue={transfer.amount}
        />
      </div>

      <Label htmlFor="date">Date</Label>
      <Input
        id="date"
        name="date"
        type="date"
        autoComplete="off"
        required
        defaultValue={format(transfer.date, "yyyy-MM-dd")}
        className="mt-1 w-full min-w-[calc(100%-1rem)] mb-6"
      />

      <Label htmlFor="from">Moving from</Label>
      <Select name="from" defaultValue={transfer.from}>
        <SelectTrigger className="mt-1 w-full mb-6">
          <SelectValue placeholder="Select account" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="charity">Charity</SelectItem>
            <SelectItem value="club">Club</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label htmlFor="to">Moving to</Label>
      <Select name="to" defaultValue={transfer.to}>
        <SelectTrigger className="mt-1 w-full mb-6">
          <SelectValue placeholder="Select account" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="charity">Charity</SelectItem>
            <SelectItem value="club">Club</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label htmlFor="notes">Notes</Label>
      <Textarea
        id="notes"
        name="notes"
        defaultValue={transfer.notes || ""}
        className="mt-1 w-full mb-6"
      />

      <FormButton type="submit">Update transfer</FormButton>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <PencilIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit transfer</DialogTitle>
            <DialogDescription>
              Update the details of the account transfer.
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
        <Button size="icon" variant="ghost">
          <PencilIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit transfer</DrawerTitle>
          <DrawerDescription>
            Update the details of the account transfer.
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

export default EditTransfer;
