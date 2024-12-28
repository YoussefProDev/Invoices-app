import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface iAppProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  isPending?: boolean;
  className?: string;
}

export function SubmitButton({
  text,
  variant,
  isPending,
  className,
}: iAppProps) {
  return (
    <>
      {isPending ? (
        <Button disabled className={cn("w-full", className)} variant={variant}>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button
          type="submit"
          className={cn("w-full", className)}
          variant={variant}
        >
          {text}
        </Button>
      )}
    </>
  );
}
