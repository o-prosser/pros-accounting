"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { deleteTransaction } from "../actions";
import { FormButton } from "@/components/form-button";
import { useActionState, useEffect, useRef, useState } from "react";
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePathname, useRouter } from "next/navigation";

const initialState = {
  success: false,
  errors: {
    id: [],
  },
};

const DeleteTransaction = ({
  transaction,
}: {
  transaction: { id: string };
}) => {
  const [state, formAction] = useActionState(deleteTransaction, initialState);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (state?.success === true) {
      setOpen(false);
      formRef.current?.reset();
      toast({
        title: "Transaction deleted successfully",
        description:
          "The transaction has been permenanetly removed from our records.",
        variant: "success",
      });
      if (pathname.includes("transactions/")) router.back();
      // router.refresh();
    }
  }, [state?.success, router, pathname]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <TrashIcon />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete transaction</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this transaction? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <form action={formAction} ref={formRef}>
              <input type="hidden" name="id" defaultValue={transaction.id} />
              <FormButton type="submit" variant="destructive">
                Delete transaction
              </FormButton>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="destructive" size="sm">
          <TrashIcon />
          Delete
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Delete transaction</DrawerTitle>
          <DrawerDescription>
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <form action={formAction} ref={formRef}>
            <input type="hidden" name="id" defaultValue={transaction.id} />
            <FormButton type="submit">Delete transaction</FormButton>
          </form>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DeleteTransaction;
