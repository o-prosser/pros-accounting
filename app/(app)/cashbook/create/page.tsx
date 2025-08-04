import { selectCategoriesMin } from "@/models/category";
import BackButton from "@/components/back-button";
import AddPaymentForm from "../(main)/@modal/(.)create/_components/form";
import { selectCurrentOrganisation } from "@/models/organisation";

const AddPaymentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const organisation = await selectCurrentOrganisation();
  const financialYear = organisation.financialYears.find((fy) => fy.isCurrent);

  const categories = await selectCategoriesMin();

  return (
    <>
      <BackButton />

      <div className="rounded-2xl border bg-muted/50 p-3">
        <h3 className="font-medium text-xl flex-1 mb-3">Add payment</h3>

        <AddPaymentForm
          searchParams={await searchParams}
          categories={
            financialYear
              ? categories.filter((c) => c.financialYearId === financialYear.id)
              : categories
          }
        />
      </div>
    </>
  );
};

export default AddPaymentPage;
