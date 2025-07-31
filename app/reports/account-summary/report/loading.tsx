import { LoaderCircleIcon } from "lucide-react";

const ReportGeneratingLoading = () => {
  return (
    <div className="min-h-[calc(100vh-1.5rem)] grid place-items-center">
      <div className="flex gap-2 items-center">
        <LoaderCircleIcon className="text-muted-foreground size-5 animate-spin" />
        <span>Generating report...</span>
      </div>
    </div>
  );
};

export default ReportGeneratingLoading;
