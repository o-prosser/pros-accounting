import { getSession } from "@/lib/auth";

const DekstopSidebarUserDetail = async () => {
  const session = await getSession();

  return (
    <>
      <span className="font-semibold">
        {session?.user.firstName} {session?.user.lastName}
      </span>
      <span className="text-xs text-muted-foreground">
        {session?.user.email}
      </span>
    </>
  );
};

export default DekstopSidebarUserDetail;
