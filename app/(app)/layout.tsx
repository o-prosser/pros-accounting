import { Metadata } from "next";
import dynamic from "next/dynamic";
import Logo from "@/components/ui/logo";

const Toaster = dynamic(() =>
  import("@/components/ui/toaster").then((mod) => mod.Toaster),
);
const MobileNavbar = dynamic(() => import("./components/mobile-navbar"));
const DesktopSidebar = dynamic(() => import("./components/desktop-sidebar"));

export const metadata: Metadata = {
  title: {
    default: "ProsAccounting",
    template: "%s – ProsAccounting",
  },
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="fixed sm:hidden inset-x-0 top-0 bg-muted pt-4 pb-3 border-b z-100 shadow">
        <Logo className="h-6" />
      </div>

      <MobileNavbar />
      <DesktopSidebar />

      <div className="min-h-screen w-screen bg-muted sm:p-3 md:!pl-78">
        {/* Content */}
        <main className="px-6 pt-18 sm:pt-6 pb-30 md:!pb-6 min-h-[calc(100vh-1.5rem)] bg-background sm:border sm:rounded-2xl">
          {children}
        </main>
      </div>

      <Toaster />
    </>
  );
};

export default AppLayout;
