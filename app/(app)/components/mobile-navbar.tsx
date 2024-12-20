import { BanknoteIcon, FileTextIcon, HomeIcon, SettingsIcon, TagIcon } from "lucide-react";
import MobileLink from "./mobile-link";

const MobileNavbar = () => {
  return (
    <nav className="fixed bottom-6 inset-x-4 h-20 flex gap-6 justify-center items-center bg-muted rounded-2xl md:!hidden z-100">
      <MobileLink href="/dashboard">
        <HomeIcon />
      </MobileLink>
      <MobileLink href="/transactions/cash-book/all">
        <BanknoteIcon />
      </MobileLink>
      <MobileLink href="/categories">
        <TagIcon />
      </MobileLink>
      <MobileLink href="/reports">
        <FileTextIcon />
      </MobileLink>
      <MobileLink href="/settings">
        <SettingsIcon />
      </MobileLink>
    </nav>
  );
}

export default MobileNavbar;