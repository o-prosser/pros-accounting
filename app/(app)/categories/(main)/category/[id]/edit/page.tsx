import { selectCategory } from "@/models/category";
import { notFound } from "next/navigation";
import BackButton from "@/components/back-button";
import EditCategoryForm from "./_components/form";

export const runtime = "edge";

const CategoryEditPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const category = await selectCategory(params.id);
  if (!category) notFound();

  return (
    <>
      <BackButton />

      <div className="rounded-2xl border bg-muted/50 p-3">
        <h3 className="font-medium text-xl flex-1 mb-3">Edit category</h3>

        <EditCategoryForm category={category} />
      </div>
    </>
  );
};

export default CategoryEditPage;
