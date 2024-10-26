import { Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CreateForm from "./_components/form";

export const runtime = "edge";

const TransfersCreatePage = async () => {
  const categories = await selectCategoriesMin();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Transfers</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Add transfer</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Title>Add a transfer</Title>

      <CreateForm categories={categories} />
    </>
  );
};

export default TransfersCreatePage;
