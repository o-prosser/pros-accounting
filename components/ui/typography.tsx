import { cn } from "@/lib/utils"

export const Caption = ({className, ...props}: React.ComponentProps<"p">) => {
  return (
    <p className={cn("text-muted-foreground font-light", className)} {...props} />
  )
}

export const Title = ({className, ...props}: React.ComponentProps<"h1">) => {
  return (
    <h1 className={cn("cd text-3xl font-[590]", className)} {...props} />
  )
}