import { getSession } from "@/lib/auth";
import { selectCurrentOrganisation } from "@/models/organisation";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const Toaster = dynamic(() => import('@/components/ui/toaster').then(mod => mod.Toaster))
const MobileNavbar = dynamic(() => import('./components/mobile-navbar'));
const DesktopSidebar = dynamic(() => import('./components/desktop-sidebar'));

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
      <MobileNavbar />
      <DesktopSidebar user={session.user} organisation={organisation} />

      {/* Content */}
      <main className="px-6 pt-6 pb-30 md:pb-6 min-h-screen md:pl-[22rem]">
        {children}
      </main>

      <Toaster />
    </>
  );
};

export default AppLayout;
