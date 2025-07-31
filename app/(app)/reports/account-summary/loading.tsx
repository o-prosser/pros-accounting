import { LoaderCircleIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex w-full items-center justify-center h-[564px] mt-14 bg-muted/50 rounded-2xl border">
      <LoaderCircleIcon className="animate-spin size-5 text-muted-foreground" />
    </div>
  );
};

export default Loading;
