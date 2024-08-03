import { redirect } from "next/navigation"

export const GET = async () => {
  redirect("/transactions/cash-book/all");
}