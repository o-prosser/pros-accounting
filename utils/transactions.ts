import { SelectTransaction } from "@/drizzle/schema";

export const getTransactionType = (transaction: SelectTransaction ) => {
  return transaction.expense !== null ? "expense" : "income";
}