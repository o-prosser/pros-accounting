"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { PlusIcon } from "lucide-react";
import { FormButton } from "@/components/form-button";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
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
import { createSubCategoryAction } from "../../actions";

const initialState = {
  success: false,
  newId: "",
  errors: {
    name: [],
  },
};

const CreateSubCategory = ({
  category,
}: {
  category: { id: string; name: string };
}) => {
    const [state, formAction] = useActionState(
      createSubCategoryAction,
      initialState,
    );
    const [open, setOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
      if (state?.success === true) {
        setOpen(false);
        formRef.current?.reset();
        toast({
          title: "Sub category added successfully",
          description: `The category has beeen added to ${category.name}.`,
          variant: "success",
        });
      }
    }, [state?.success, state?.newId]);
    const isDesktop = useMediaQuery("(min-width: 768px)");

  const Form = () => (
    <form action={formAction} ref={formRef}>
      <input type="hidden" name="categoryId" value={category.id} />

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

      <FormButton type="submit">Add sub category</FormButton>
    </form>
  );

if (isDesktop) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon />
          Add sub category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add sub category</DialogTitle>
          <DialogDescription>
            Give a name for the new sub category of {category.name}
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
      <Button variant="outline">
        <PlusIcon />
        Add sub category
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader className="text-left">
        <DrawerTitle>Add sub category</DrawerTitle>
        <DrawerDescription>
          Give a name for the new sub category of {category.name}
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

export default CreateSubCategory;
