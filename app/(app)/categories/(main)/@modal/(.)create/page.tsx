import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import AddCategoryForm from "./_components/form";

const AddCategoryModalPage = () => {
  return (
    <>
      <DialogClose asChild>
        <Button
          variant="ghost"
          className="absolute top-2 right-2"
          size="icon-sm"
        >
          <span className="sr-only">Close</span>
          <XIcon />
        </Button>
      </DialogClose>
      <DialogHeader>
        <DialogTitle>Add category</DialogTitle>
      </DialogHeader>
      <AddCategoryForm />
    </>
  );
};

export default AddCategoryModalPage;
