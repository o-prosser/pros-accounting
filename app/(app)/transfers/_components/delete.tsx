"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon, PoundSterlingIcon, TrashIcon } from "lucide-react";
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
import { deleteTransferAction } from "../actions";


const DeleteTransfer = ({
  transfer,
}: {
  transfer: {
    id: string;
  };
}) => {
  const [state, formAction] = useFormState(deleteTransferAction, {success: false, deletedId: ""});
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success === true) {
      setOpen(false);
      formRef.current?.reset();
      toast({
        title: "Transfer deleted successfully",
        description: "The account transfer has beeen deleted.",
        variant: "destructive",
      });
    }
  }, [state?.success, state?.deletedId]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const Form = () => (
    <form action={formAction} ref={formRef}>
      <input type="hidden" name="id" defaultValue={transfer.id} />

      <FormButton type="submit">Delete transfer</FormButton>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <TrashIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete transfer</DialogTitle>
            <DialogDescription>Are you sure you want to delete this transfer?
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
          <TrashIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Delete transfer</DrawerTitle>
          <DrawerDescription>
            Are you sure you want to delete this transfer?
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

export default DeleteTransfer;
