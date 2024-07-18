import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import SelectCategory from "./_components/categories";
import { Textarea } from "@/components/ui/textarea";
import { createTransactionAction } from "./actions";

const TransactionsCreatePage = async () => {
  const categories = await selectCategoriesMin();

  return (
    <>
      <Title>Add a transaction</Title>

      <form action={createTransactionAction} className="max-w-2xl">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" autoComplete="off" required autoFocus className="mt-1 w-full max-w-lg mb-6" />

        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" type="date" autoComplete="off" required className="mt-1 w-full min-w-[20rem] mb-6" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
          <div>
            <Label htmlFor="income">Income</Label>
            <Input id="income" name="income" type="income" autoComplete="off" className="mt-1 w-full" step="0.01" />
          </div>
          <div>
            <Label htmlFor="expense">Expense</Label>
            <Input id="expense" name="expense" type="number" autoComplete="off" className="mt-1 w-full" step="0.01" />
          </div>
        </div>

        <SelectCategory categories={categories} />

        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" className="mt-1 w-full mb-6" />

        <Button type="submit">Add transaction</Button>
      </form>
    </>
  )
}

export default TransactionsCreatePage