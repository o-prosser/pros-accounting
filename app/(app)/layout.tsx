import { BanknoteIcon, FileTextIcon, HomeIcon, SettingsIcon, TagIcon } from "lucide-react";
import MobileLink from "./components/mobile-link";
import Logo from "@/components/ui/logo";
import DesktopLink from "./components/desktop-link";

const AppLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      {/* Mobile */}
      <nav className="fixed bottom-6 inset-x-4 h-20 flex gap-6 justify-center items-center bg-muted rounded-2xl md:hidden">
        <MobileLink href="/dashboard">
          <HomeIcon/>
        </MobileLink>
        <MobileLink href="#">
          <BanknoteIcon />
        </MobileLink>
        <MobileLink href="#">
          <TagIcon />
        </MobileLink>
        <MobileLink href="#">
          <FileTextIcon />
        </MobileLink>
        <MobileLink href="#">
          <SettingsIcon />
        </MobileLink>
      </nav>

      {/* Desktop */}
      <div className="hidden md:flex fixed left-4 inset-y-4 bg-muted w-80 py-6 px-3 gap-y-2 flex-col items-start rounded-2xl">
        <Logo className="h-6 pl-3 w-auto mb-4" />

        <DesktopLink href="/dashboard">
          <HomeIcon />
          Dashboard
        </DesktopLink>           
        <DesktopLink href="#">
          <BanknoteIcon />
          Payments
        </DesktopLink>     
        <DesktopLink href="#">
          <TagIcon />
          Categories
        </DesktopLink>    
        <DesktopLink href="#">
          <FileTextIcon />
          Reports
        </DesktopLink>   
        <DesktopLink href="#">
          <SettingsIcon />
          Settings
        </DesktopLink>       
      </div>

      {/* Content */}
      <main className="px-6 pt-6 pb-30 md:pb-6 min-h-screen md:pl-[22rem]">
        {children}
      </main>
    </>
  )
}

export default AppLayout;