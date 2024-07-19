import seed from "@/cli/seed"
import { notFound } from "next/navigation";

export const GET = async () => {
  // await seed();
  notFound();
}