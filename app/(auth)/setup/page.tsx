import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Title } from "@/components/ui/typography"
import { setupAction } from "./actions"

const SetupPage = () => {
  return (
    <>
      <Title className="sm:text-center mb-6">Set up your organisation</Title>

      <form action={setupAction} className="w-full">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" autoComplete="name" required autoFocus className="mt-1 w-full mb-6" />

        <Button type="submit" className="w-full">Finish</Button>
      </form>
    </>
  )
}

export default SetupPage;