import { cn } from "@/lib/utils";

const WidgetCard = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("rounded-2xl border bg-muted/50 p-3", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const WidgetCardTitle = ({
  className,
  children,
  ...props
}: React.ComponentProps<"h3">) => {
  return (
    <h3 className={cn("font-medium text-xl flex-1", className)} {...props}>
      {children}
    </h3>
  );
};

export { WidgetCard, WidgetCardTitle };
