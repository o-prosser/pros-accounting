import { Caption, Title } from "@/components/ui/typography";
import AccountSummaryForm from "./form";
import { selectCurrentOrganisation } from "@/models/organisation";

export const runtime = "edge";

const AccountSummaryPage = async () => {
  const organisation = await selectCurrentOrganisation();

  return (
    <>
      <Title className="mb-0">Generate an account summary report</Title>

      <Caption>Choose which accounts to include, and the date range.</Caption>

      <AccountSummaryForm organisation={organisation} />
    </>
  );
};

export default AccountSummaryPage;
