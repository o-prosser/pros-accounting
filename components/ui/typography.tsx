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

export const Title = ({className, icon, ...props}: React.ComponentProps<"h1"> & {icon?: any}) => {
  const Icon = icon;

  return (
    <div className="mb-6 flex items-center gap-3">
      {icon && Icon ? (
        <div className="h-8 w-8 rounded-lg from-foreground to-zinc-700 dark:to-zinc-300 bg-gradient-to-t shadow-md flex justify-center items-center">
          <Icon className="h-5 w-5 text-background fill-icon-dark"  />
        </div>
      ) : ""}
      <h1 className={cn("cd text-3xl font-semibold", className)} {...props} />
    </div>
  )
}

export const Heading = ({className, ...props}: React.ComponentProps<"h2">) => {
  return (
    <h2 className={cn("text-xl font-semibold mb-1", className)} {...props} />
  )
}