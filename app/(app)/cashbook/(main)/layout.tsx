import { Title } from "@/components/ui/typography";
import { BanknoteIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CashbookLayout = async ({
  children,
  sidepanel,
  modal,
}: {
  children: React.ReactNode;
  sidepanel: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Title icon={BanknoteIcon}>Cash book</Title>
        {/* <AddDropdown /> */}
        <Button variant="dark" asChild>
          <Link href="/cashbook/create">
            <PlusIcon />
            Add payment
          </Link>
        </Button>
      </div>

      <div className="flex h-full w-full gap-6">
        <div className="flex-1">{children}</div>
        {sidepanel}
      </div>

      {modal}
    </>
  );
};

export default CashbookLayout;
