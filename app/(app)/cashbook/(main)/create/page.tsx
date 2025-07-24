import { selectCategoriesMin } from "@/models/category";
import BackButton from "@/components/back-button";
import AddPaymentForm from "../@modal/(.)create/_components/form";

const AddPaymentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const categories = await selectCategoriesMin();

  return (
    <>
      <BackButton />

      <div className="rounded-2xl border bg-muted/50 p-3">
        <h3 className="font-medium text-xl flex-1">Add payment</h3>

        <AddPaymentForm
          searchParams={await searchParams}
          categories={categories}
        />
      </div>
    </>
  );
};

export default AddPaymentPage;
