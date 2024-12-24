import { Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CreateForm from "./_components/form";
import { BanknoteIcon } from "lucide-react";

export const runtime = "edge";

const TransactionsCreatePage = async (props: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const searchParams = await props.searchParams;

  const categories = await selectCategoriesMin();

  return (
    <>
      <Title icon={BanknoteIcon}>Add a transaction</Title>

      <CreateForm searchParams={searchParams} categories={categories} />
    </>
  );
};

export default TransactionsCreatePage;
