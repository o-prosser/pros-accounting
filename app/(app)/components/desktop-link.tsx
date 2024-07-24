import { Button, ButtonProps } from "@/components/ui/button"
import Link from "next/link"

const DesktopLink = ({href, children, ...props}: {children: React.ReactNode, href: string} & ButtonProps) => {
  return (
    <Button asChild variant="ghost" className="hover:bg-background w-full justify-start px-3 data-[active=true]:bg-background/50" {...props}>
      <Link href={href}>
        {children}
      </Link>
    </Button>
  )
}

export default DesktopLink;