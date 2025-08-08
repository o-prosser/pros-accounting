"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { LoaderCircleIcon } from "lucide-react";

const FormButton = ({ children, variant = "dark", ...props }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button variant={variant} {...props}>
      {pending ? <LoaderCircleIcon className="animate-spin" /> : ""}
      {children}
    </Button>
  );
};

export { FormButton };
