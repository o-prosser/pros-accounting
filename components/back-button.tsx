"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      className="rounded-2xl bg-muted/50 mb-4"
    >
      <ArrowLeftIcon />
      Back
    </Button>
  );
};

export default BackButton;
