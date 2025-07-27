import BackButton from "@/components/back-button";

const AddCategoryPage = () => {
  return (
    <>
      <BackButton />

      <div className="rounded-2xl border bg-muted/50 p-3">
        <h3 className="font-medium text-xl flex-1 mb-3">Add category</h3>

        {/* <AddPaymentForm
          searchParams={await searchParams}
          categories={categories}
        /> */}
      </div>
    </>
  );
};

export default AddCategoryPage;
