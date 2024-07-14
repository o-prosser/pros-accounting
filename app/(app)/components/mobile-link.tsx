import { Button, ButtonProps } from "@/components/ui/button"
import Link from "next/link"

const MobileLink = ({href, children, ...props}: {children: React.ReactNode, href: string} & ButtonProps) => {
  return (
    <Button asChild variant="ghost" size="icon-lg" {...props}>
      <Link href={href}>
        {children}
      </Link>
    </Button>
  )
}

export default MobileLink;