import { Title } from "@/components/ui/typography";
import { BanknoteIcon, PlusIcon, TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CategoriesLayout = async ({
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
        <Title icon={TagIcon}>Categories</Title>
        {/* <AddDropdown /> */}
        <Button variant="dark" asChild>
          <Link href="/categories/create">
            <PlusIcon />
            Add category
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

export default CategoriesLayout;
