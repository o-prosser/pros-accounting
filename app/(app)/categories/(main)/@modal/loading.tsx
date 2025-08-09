import { DialogTitle } from "@/components/ui/dialog";
import { LoaderCircleIcon } from "lucide-react";
import { VisuallyHidden } from "radix-ui";

const ModalLoading = () => {
  return (
    <div className="flex items-center justify-center h-[516px]">
      <VisuallyHidden.Root>
        <DialogTitle>Loading</DialogTitle>
      </VisuallyHidden.Root>
      <LoaderCircleIcon className="size-5 animate-spin" />
    </div>
  );
};

export default ModalLoading;
