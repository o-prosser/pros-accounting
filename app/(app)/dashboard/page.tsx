import { Caption, Heading, Title } from "@/components/ui/typography";
import { format } from "date-fns";
import { Metadata } from "next";
import Totals from "./_components/totals";
import Transactions from "./_components";

export const metadata: Metadata = {title: 'Dashboard'}

const DashboardPage = () => {
  return (
    <>
      <Caption>{format(new Date, "EEEE, do MMMM yyyy")}</Caption>
      <Title>Welcome back, Owen</Title>

      <Totals />

      <Heading className="mt-6 mb-2">Latest transactions</Heading>
      <Transactions />
    </>
  )
}

export default DashboardPage;