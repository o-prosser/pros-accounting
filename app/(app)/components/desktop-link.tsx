import LoadingIndicator from "@/components/loading-indicator";
import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";

const DesktopLink = ({
  href,
  children,
  ...props
}: { children: React.ReactNode; href: string } & ButtonProps) => {
  return (
    <Button
      asChild
      variant="ghost"
      className="hover:bg-muted-foreground/20 w-full justify-start px-3 data-[active=true]:bg-muted-foreground/20 [[data-active='true']_&>svg]:!text-foreground [&>svg]:size-4.5"
      {...props}
    >
      <Link href={href}>
        {children}
        <LoadingIndicator />
      </Link>
    </Button>
  );
};

export default DesktopLink;
