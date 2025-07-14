import { cn } from "@/lib/utils";

export const Caption = ({ className, ...props }: React.ComponentProps<"p">) => {
  return <p className={cn("text-muted-foreground", className)} {...props} />;
};

export const Muted = ({ className, ...props }: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn("text-muted-foreground text-sm leading-5", className)}
      {...props}
    />
  );
};

export const ErrorMessage = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn(
        "text-destructive font-medium text-sm leading-none",
        className,
      )}
      {...props}
    />
  );
};

export const Title = ({
  className,
  icon,
  ...props
}: React.ComponentProps<"h1"> & { icon?: any }) => {
  const Icon = icon;

  return (
    <div className="mb-6 flex items-center gap-3">
      {icon && Icon ? (
        <div className="h-8 w-8 rounded-lg bg-muted border shadow-md flex justify-center items-center">
          <Icon className="h-4.5 w-4.5 text-foreground" />
        </div>
      ) : (
        ""
      )}
      <h1
        className={cn("cd text-3xl font-medium tracking-tight", className)}
        {...props}
      />
    </div>
  );
};

export const Heading = ({
  className,
  ...props
}: React.ComponentProps<"h2">) => {
  return (
    <h2 className={cn("text-xl font-semibold mb-1", className)} {...props} />
  );
};
