import { Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CreateForm from "./_components/form";
import { ArrowRightLeft } from "lucide-react";

export const runtime = "edge";

const TransfersCreatePage = async () => {
  const categories = await selectCategoriesMin();

  return (
    <>
      <Title icon={ArrowRightLeft}>Add a transfer</Title>

      <CreateForm categories={categories} />
    </>
  );
};

export default TransfersCreatePage;
