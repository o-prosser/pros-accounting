import { Title } from "@/components/ui/typography";
import { BanknoteIcon } from "lucide-react";
import AddDropdown from "./_components/add-dropdown";

const CashbookLayout = async ({
  children,
  sidepanel,
}: {
  children: React.ReactNode;
  sidepanel: React.ReactNode;
}) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Title icon={BanknoteIcon}>Cash book</Title>
        <AddDropdown />
      </div>

      <div className="flex h-full w-full gap-6">
        <div className="flex-1">{children}</div>
        {sidepanel}
      </div>
    </>
  );
};

export default CashbookLayout;
