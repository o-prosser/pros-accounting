"use client";

import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const CloseButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="ghost"
      size="icon"
      className="bg-background/70 h-8 w-8"
    >
      <XIcon />
    </Button>
  );
};

export default CloseButton;
