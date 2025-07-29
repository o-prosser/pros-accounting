import { LoaderCircleIcon } from "lucide-react";

const SidepanelLoading = () => {
  return (
    <div className="flex w-full items-center justify-center h-[589px]">
      <LoaderCircleIcon className="animate-spin size-5 text-muted-foreground" />
    </div>
  );
};

export default SidepanelLoading;
