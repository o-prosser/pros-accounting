import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EditIcon, PencilIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { updateCategoryAction } from "../actions";
import { FormButton } from "@/components/form-button";
import { colours } from "@/utils/colours";

const EditCategory = ({category}: {category: {id: string; name: string}}) => {
  return (
    <ResponsiveDialog
      trigger={
        <Button variant="outline">
          <PencilIcon />
          <span className="hidden sm:inline">Edit</span>
        </Button>
      }
      title="Edit category"
      description="Edit the details of the category."
    >
      <form action={updateCategoryAction}>
        <input type="hidden" name="id" defaultValue={category.id} />

        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          defaultValue={category.name}
          required
          autoFocus
          className="mt-1 w-full mb-6"
        />

        {/* <Label htmlFor="account">Account</Label>
        <Select name="account" defaultValue={category.account}>
          <SelectTrigger className="mt-1 w-full mb-6">
            <SelectValue placeholder="Select account" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="charity">Charity</SelectItem>
              <SelectItem value="club">Club</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}

        <Label htmlFor="colour">Colour</Label>
        <Select name="colour">
          <SelectTrigger className="mt-1 w-full mb-6">
            <SelectValue placeholder="Select a theme colour" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {colours.map((colour, idx) => (
                <SelectItem key={idx} value={colour.name}>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: colour.foreground }}
                    />
                    <span className="capitalize">{colour.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <FormButton type="submit">Update category</FormButton>
      </form>
    </ResponsiveDialog>
  );
}

export default EditCategory;