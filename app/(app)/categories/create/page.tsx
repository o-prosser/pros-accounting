import BackButton from "@/components/back-button";
import AddCategoryForm from "../(main)/@modal/(.)create/_components/form";

const AddCategoryPage = () => {
  return (
    <>
      <BackButton />

      <div className="rounded-2xl border bg-muted/50 p-3">
        <h3 className="font-medium text-xl flex-1 mb-3">Add category</h3>

        <AddCategoryForm />
      </div>
    </>
  );
};

export default AddCategoryPage;
