import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Modal from "../modal";
import AddPaymentForm from "./_components/form";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { selectCategoriesMin } from "@/models/category";

const AddPaymentModalPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const categories = await selectCategoriesMin();

  return (
    <Modal>
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
        <DialogTitle>Add payment</DialogTitle>
      </DialogHeader>
      <AddPaymentForm
        searchParams={await searchParams}
        categories={categories}
      />
    </Modal>
  );
};

export default AddPaymentModalPage;
