import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmptyStateProps } from "@/types/dataTypes";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

export function EmptyState({
  buttonText = "Add Item",
  description,
  href,
  title,
  action,
  className,
  Icon, // Icona predefinita
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col flex-1 h-full items-center justify-center rounded-md border-2 border-dashed p-8 text-center animate-in fade-in-50",
        className
      )}
    >
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
        {Icon ? (
          <Icon className="size-10 text-primary" />
        ) : (
          <Ban className="size-10 text-primary" />
        )}
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-sm text-muted-foreground max-w-md mx-auto text-center">
        {description}
      </p>
      <div className="flex space-x-4">
        {href && (
          <Link href={href} className={buttonVariants()}>
            <PlusCircle className="size-4 mr-2" /> {buttonText}
          </Link>
        )}
        {action && (
          <Button type="button" onClick={action}>
            <PlusCircle className="size-4 mr-2" /> {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
