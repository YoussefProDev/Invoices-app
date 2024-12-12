import { Button } from "@/components/ui/button";
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
}

export function SubmitButton({ text, variant, isPending }: iAppProps) {
  return (
    <>
      {isPending ? (
        <Button disabled className="w-full" variant={variant}>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full" variant={variant}>
          {text}
        </Button>
      )}
    </>
  );
}
