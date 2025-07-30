import { getSession } from "@/lib/auth";
import { selectCurrentOrganisation } from "@/models/organisation";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import MobileNavbar from "./components/mobile-navbar";
import DesktopSidebar from "./components/desktop-sidebar";
import { Toaster } from "@/components/ui/toaster";
import Logo from "@/components/ui/logo";

// const Toaster = dynamic(() => import('@/components/ui/toaster').then(mod => mod.Toaster))
// const MobileNavbar = dynamic(() => import('./components/mobile-navbar'));
// const DesktopSidebar = dynamic(() => import('./components/desktop-sidebar'));

export const metadata: Metadata = {
  title: {
    default: "ProsAccounting",
    template: "%s – ProsAccounting",
  },
};

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const organisation = await selectCurrentOrganisation();

  if (!session || !organisation) redirect("/setup");

  return (
    <>
      <div className="fixed sm:hidden inset-x-0 top-0 bg-muted pt-4 pb-3 border-b z-100 shadow">
        <Logo className="h-6" />
      </div>

      <MobileNavbar />
      <DesktopSidebar user={session.user} organisation={organisation} />

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
