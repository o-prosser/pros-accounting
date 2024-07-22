import { Metadata } from "next";
import { Caption, Title } from "@/components/ui/typography";
import ResetPasswordForm from "./form";

export const metadata: Metadata = { title: "Forgot Password" };

const ForgotPasswordPage = () => {
  return (
    <>
      <Title className="mb-2 sm:text-center">Reset your password</Title>
      <Caption className="sm:text-center mb-6">If an account with that email address exists, an email has been sent containing a one time code to reset your password.</Caption>
      <ResetPasswordForm />
    </>
  );
};

export default ForgotPasswordPage;
