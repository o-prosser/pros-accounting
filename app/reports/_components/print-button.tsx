"use client";

import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";

const PrintButton = () => {
  return (
    <Button
      onClick={() => window.print()}
      variant="outline"
      className="rounded-2xl bg-muted/50 mb-4"
    >
      <PrinterIcon />
      Print
    </Button>
  );
};

export default PrintButton;
