import { LoaderCircleIcon } from "lucide-react";

const TransactionsIndexLoading = () => {
  return (
    <div className="rounded-lg bg-muted flex items-center justify-center gap-2 h-[80vh]">
      <LoaderCircleIcon className="h-5 w-5 animate-spin" />
      <span className="font-medium text-sm">Loading transactions...</span>
    </div>
  );
}

export default TransactionsIndexLoading