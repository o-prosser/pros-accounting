"use client";

import { FormButton } from "@/components/form-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useActionState, useEffect } from "react";
import { updateProfileAction } from "../actions";

const ProfileForm = ({
  user,
}: {
  user: {
    firstName: string;
    lastName: string | null;
    email: string;
  };
}) => {
  const [state, formAction] = useActionState(updateProfileAction, {
    success: false,
    errors: null,
  });

  useEffect(() => {
    if (state.success === true) {
      toast({
        title: "Profile updated sucessfully.",
        // description: "The category has been added to this financial year.",
        variant: "success",
      });
    }
  }, [state.success]);

  return (
    <div className="rounded-2xl border bg-muted/50 p-3 max-w-xl w-full">
      <h3 className="font-medium text-xl flex-1 mb-3">Update your details</h3>

      <form action={formAction} className="w-full">
        {state.errors ? (
          <div className="rounded-lg border border-red-500 p-3 bg-red-500/10 text-sm text-red-500 mt-3">
            {state.errors}
          </div>
        ) : (
          ""
        )}

        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="off"
            required
            defaultValue={user.firstName}
            className="mt-0.5 w-full"
          />
        </div>

        <div className="mt-3">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="off"
            required
            defaultValue={user.lastName || ""}
            className="mt-0.5 w-full"
          />
        </div>

        <div className="mt-3">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={user.email}
            className="mt-0.5 w-full"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <FormButton>Save</FormButton>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
