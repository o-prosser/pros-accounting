import { getSession } from "@/lib/auth";

const DashboardGreeting = async () => {
  const session = await getSession();

  const hour = new Date().getHours();

  const message =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return `${message}, ${session?.user.firstName}`;
};

const DashboardGreetingLoading = () => {
  const hour = new Date().getHours();

  return hour < 12
    ? "Good morning"
    : hour < 18
    ? "Good afternoon"
    : "Good evening";
};

export { DashboardGreeting, DashboardGreetingLoading };
