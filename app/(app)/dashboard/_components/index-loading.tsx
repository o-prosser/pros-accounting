import { LoaderCircleIcon } from "lucide-react";

const TransactionsLoading = () => {
  return (
    <div className="rounded-lg bg-muted/50 flex items-center justify-center gap-2 h-72">
      <LoaderCircleIcon className="h-5 w-5 animate-spin text-muted-foreground" />
      <span className="font-medium text-sm">Loading transactions...</span>
    </div>
  )
}

export default TransactionsLoading;