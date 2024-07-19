import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { PlusIcon } from "lucide-react";
import { createSubCategoryAction } from "../../actions";
import { FormButton } from "@/components/form-button";

const CreateSubCategory = ({category}: {category: {id: string; name: string}}) => {
  return (
    <ResponsiveDialog trigger={<Button variant="outline"><PlusIcon />Add sub category</Button>}
    title={`Add sub category to {category.name}`}
    description="Add the details of the new sub category."
    >
      <form action={createSubCategoryAction}>
        <input type="hidden" name="categoryId" value={category.id} />

        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" autoComplete="off" required autoFocus className="mt-1 w-full mb-6" />

        <FormButton type="submit">Add sub category</FormButton>
      </form>
    </ResponsiveDialog>
  )
}

export default CreateSubCategory;