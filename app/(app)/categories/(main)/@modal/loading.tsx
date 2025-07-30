import { DialogTitle } from "@/components/ui/dialog";
import { LoaderCircleIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const ModalLoading = () => {
  return (
    <div className="flex items-center justify-center h-[516px]">
      <VisuallyHidden>
        <DialogTitle>Loading</DialogTitle>
      </VisuallyHidden>
      <LoaderCircleIcon className="size-5 animate-spin" />
    </div>
  );
};

export default ModalLoading;
