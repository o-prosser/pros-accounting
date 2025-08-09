import { Caption, Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import TransactionLogForm from "./form";
import { selectCurrentOrganisation } from "@/models/organisation";

export const runtime = "edge";

const CategorySummariesPage = async () => {
  const categories = await selectCategoriesMin();
  const organisation = await selectCurrentOrganisation();

  return (
    <>
      <Title className="mb-0">Generate a transaction log</Title>

      <Caption>
        Fitler the payments to include, and customise the look of the report.
      </Caption>

      <TransactionLogForm organisation={organisation} />
    </>
  );
};

export default CategorySummariesPage;
