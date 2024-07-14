import { Caption, Title } from "@/components/ui/typography";
import { format } from "date-fns";

const DashboardPage = () => {
  return (
    <>
      <Caption>{format(new Date, "EEEE, do MMMM yyyy")}</Caption>
      <Title>Welcome back, Owen</Title>
    </>
  )
}

export default DashboardPage;