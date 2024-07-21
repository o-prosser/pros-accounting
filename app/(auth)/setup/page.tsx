import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Caption, Title } from "@/components/ui/typography"
import { setupAction } from "./actions"
import { FormButton } from "@/components/form-button"

const SetupPage = () => {
  return (
    <>
      <Title className="sm:text-center mb-2">Set up your organisation</Title>

      <Caption className="sm:text-center mb-6">Create an organisation by submitting a name below, or<br />ask someone to invite you to an exisiting organisation.</Caption>

      <form action={setupAction} className="w-full">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" autoComplete="name" required autoFocus minLength={3} maxLength={50} className="mt-1 w-full mb-6" />

        <FormButton type="submit" className="w-full">Create</FormButton>
      </form>
    </>
  )
}

export default SetupPage;