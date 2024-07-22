import { FormButton } from "@/components/form-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Muted, Heading, Title } from "@/components/ui/typography"
import { selectCurrentOrganisation } from "@/models/organisation";
import { Metadata } from "next";
import { invite, updateOrganisation } from "./actions";
import { format } from "date-fns";

export const metadata: Metadata = {title: "Settings"}

const SettingsPage = async () => {
  const organisation = await selectCurrentOrganisation();

  return (
    <>
      <Title>Settings</Title>

      <div className="max-w-2xl">
        <Heading>Organisation</Heading>
        <Muted>
          Manage your organisation details. Any changes will be reflected across
          all the app and on all reports, affecting all members of the
          organisation.
        </Muted>

        <form action={updateOrganisation} className="w-full mt-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={organisation.name}
            className="mt-1 w-full mb-4"
          />

          <Label htmlFor="endOfFinancialYear">End of financial year</Label>
          <Input
            id="endOfFinancialYear"
            name="endOfFinancialYear"
            type="date"
            required
            defaultValue={format(organisation.endOfFinancialYear, "yyyy-MM-dd")}
            className="mt-1 w-full min-w-[28rem] mb-4"
          />

          <Label htmlFor="themeColour">Theme colour</Label>
          <Input
            id="themeColour"
            name="themeColour"
            type="color"
            defaultValue={organisation.themeColour || ""}
            className="mt-1 w-full mb-4"
          />

          <FormButton type="submit">Save</FormButton>
        </form>

        <hr className="my-6" />

        <Heading>Invite user</Heading>

        <form action={invite} className="w-full mt-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            required
            className="mt-1 w-full mb-4"
          />

          <FormButton type="submit">Invite</FormButton>
        </form>
      </div>
    </>
  );
}

export default SettingsPage;