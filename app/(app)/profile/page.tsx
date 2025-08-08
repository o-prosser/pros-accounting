import { Title } from "@/components/ui/typography";
import { UserIcon } from "lucide-react";
import type { Metadata } from "next";
import ProfileForm from "./_components/form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = async () => {
  const session = await getSession();

  const user = session?.user;
  if (!user) redirect("/login");

  return (
    <>
      <Title icon={UserIcon}>Profile</Title>
      <ProfileForm user={user} />
    </>
  );
};

export default ProfilePage;
