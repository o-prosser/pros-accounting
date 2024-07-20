import { Metadata } from "next";
import LoginForm from "./form";

export const metadata: Metadata = { title: "Login" };

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
