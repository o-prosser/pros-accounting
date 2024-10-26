import { Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { selectTransfer } from "@/models/transfer";
import EditForm from "./_components/form";
import { notFound } from "next/navigation";

export const runtime = "edge";

const TransfersEditPage = async (props: {params: Promise<{id: string}>}) => {
  const categories = await selectCategoriesMin();

  const params = await props.params;

  const transfer = await selectTransfer(params);
  if (!transfer) notFound();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Transfers</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Edit transfer</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Title>Edit transfer</Title>

      <EditForm transfer={transfer} categories={categories} />
    </>
  );
};

export default TransfersEditPage;
