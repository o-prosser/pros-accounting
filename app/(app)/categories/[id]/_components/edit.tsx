import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EditIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { updateCategoryAction } from "../actions";
import { FormButton } from "@/components/form-button";

const EditCategory = ({category}: {category: {id: string; name: string; account: "club"|"charity"}}) => {
  return (
    <ResponsiveDialog trigger={<Button><EditIcon /><span className="hidden sm:inline">Edit category</span></Button>}
    title="Edit category"
    description="Edit the details of the category."
    >
      <form action={updateCategoryAction}>
        <input type="hidden" name="id" defaultValue={category.id} />

        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" autoComplete="off" defaultValue={category.name} required autoFocus className="mt-1 w-full mb-6" />

        <Label htmlFor="account">Account</Label>
        <Select name="account" defaultValue={category.account}>
          <SelectTrigger className="mt-1 w-full mb-6">
            <SelectValue placeholder="Select an account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="charity">Charity</SelectItem>
              <SelectItem value="club">Club</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <FormButton type="submit">Update category</FormButton>
      </form>
    </ResponsiveDialog>
  )
}

export default EditCategory;