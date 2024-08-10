import { Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CreateForm from "./_components/form";

export const runtime = 'edge';

const TransactionsCreatePage = async ({searchParams}: {searchParams: {[key: string]: string}}) => {
  const categories = await selectCategoriesMin();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Transactions</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Add transaction</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Title>Add a transaction</Title>

      <CreateForm searchParams={searchParams} categories={categories} />
    </>
  );
};

export default TransactionsCreatePage;
