import { Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import CreateForm from "./_components/form";
import { BanknoteIcon } from "lucide-react";

export const runtime = "edge";

const PaymentsCreatePage = async (props: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const searchParams = await props.searchParams;

  const categories = await selectCategoriesMin();

  return (
    <>
      <Title icon={BanknoteIcon}>Add payment to cash book</Title>

      <CreateForm searchParams={searchParams} categories={categories} />
    </>
  );
};

export default PaymentsCreatePage;
