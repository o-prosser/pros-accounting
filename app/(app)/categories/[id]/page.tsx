import { Title } from "@/components/ui/typography";
import { selectCategory } from "@/models/category"
import { notFound } from "next/navigation";

const CategoryPage = async ({params}: {params: {id: string}}) => {
  const category = await selectCategory(params.id);
  if (!category) notFound();

  return (
    <>
      <Title>{category.name}</Title>
    </>
  )
}

export default CategoryPage;