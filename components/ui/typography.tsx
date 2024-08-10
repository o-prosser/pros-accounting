import { cn } from "@/lib/utils"

export const Caption = ({className, ...props}: React.ComponentProps<"p">) => {
  return (
    <p className={cn("text-muted-foreground font-light", className)} {...props} />
  )
}

export const Muted = ({className, ...props}: React.ComponentProps<"p">) => {
  return (
    <p className={cn("text-muted-foreground text-sm leading-5", className)} {...props} />
  )
}

export const ErrorMessage = ({className, ...props}: React.ComponentProps<"p">) => {
  return (
    <p className={cn("text-destructive font-medium text-sm leading-none", className)} {...props} />
  )
}

export const Title = ({className, ...props}: React.ComponentProps<"h1">) => {
  return (
    <h1 className={cn("cd text-3xl font-[590] mb-6", className)} {...props} />
  )
}

export const Heading = ({className, ...props}: React.ComponentProps<"h2">) => {
  return (
    <h2 className={cn("text-xl font-medium mb-1", className)} {...props} />
  )
}