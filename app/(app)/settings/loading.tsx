import { LoaderCircleIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Title } from "@/components/ui/typography";
import { SettingsIcon } from "@/components/icons/settings";

const Loading = () => {
  return (
    <>
      {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Settings</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}

      <Title icon={SettingsIcon}>Settings</Title>
      <div className="rounded-lg bg-muted flex items-center justify-center gap-2 h-[80vh]">
        <LoaderCircleIcon className="h-5 w-5 animate-spin" />
        <span className="font-medium text-sm">Loading...</span>
      </div>
    </>
  );
}

export default Loading;