import OnBoardingForm from "@/components/OnBoardingForm";
import { DEFAULT_LOGIN_REDIRECT, LOGIN_PAGE } from "@/routes";
import { requireBuisnessDetail } from "@/utils/hooks";
import { redirect } from "next/navigation";
import { Menu, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "@/auth";
const OnBoardingPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-fuchsia-500 to-cyan-500 ">
      {/* User Dropdown
      <div className="flex items-center ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full" variant="outline" size="icon">
              <User2 className="w-5 h-5 lg:w-6 lg:h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/invoices">Invoices</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <form
                className="w-full"
                action={async () => {
                  "use server";
                  await signOut();
                  redirect(LOGIN_PAGE);
                }}
              >
                <button className="w-full text-left">Log out</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
      <OnBoardingForm />
    </div>
  );
};

export default OnBoardingPage;
