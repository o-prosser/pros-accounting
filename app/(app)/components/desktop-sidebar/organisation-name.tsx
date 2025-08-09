import { selectCurrentOrganisation } from "@/models/organisation";
import { redirect } from "next/navigation";

const DekstopSidebarOrganisationName = async () => {
  const organisation = await selectCurrentOrganisation();
  if (!organisation) redirect("/setup");

  return organisation.name;
};

export default DekstopSidebarOrganisationName;
