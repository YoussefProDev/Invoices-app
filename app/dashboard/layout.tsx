import { ReactNode } from "react";
import { requireBuisnessDetail, requireUserSession } from "@/utils/hooks";
import Link from "next/link";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { DashboardLinks } from "@/components/DashboardLinks";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/sonner";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { LOGIN_PAGE, ONBOARDING_PAGE } from "@/routes";
import { DataProvider } from "@/providers/DataProvider";
import { getClients } from "@/utils/client";
import { getInvoices } from "@/utils/invoices";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isBusinessDetailIncomplete = await requireBuisnessDetail();
  if (isBusinessDetailIncomplete) {
    redirect(ONBOARDING_PAGE);
  }
  const userSession = await requireUserSession();
  const clients = await getClients(userSession?.id as string);
  const invoices = await getInvoices(userSession?.id as string);

  return (
    <>
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[280px_1fr]">
        {/* Sidebar for Large Screens */}
        <aside className="hidden lg:block  border-r bg-muted/40">
          <div className="flex flex-col max-h-screen h-full gap-2">
            <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={Logo}
                  alt="Logo"
                  className="w-8 h-8 lg:w-10 lg:h-10"
                />
                <p className="text-lg lg:text-2xl font-bold">
                  Invoice<span className="text-blue-600">Marshal</span>
                </p>
              </Link>
            </div>
            <nav className="flex-1 overflow-auto px-2 text-sm font-medium lg:px-4">
              <DashboardLinks />
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col">
          {/* Header */}
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>

                <nav className="grid gap-2 mt-10">
                  <DashboardLinks insideSheet />
                </nav>
              </SheetContent>
            </Sheet>

            {/* User Dropdown */}
            <div className="flex items-center ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full"
                    variant="outline"
                    size="icon"
                  >
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
            </div>
          </header>

          {/* Main Content */}
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <DataProvider clients={clients} invoices={invoices}>
              {children}
            </DataProvider>
          </main>
        </div>
      </div>
      <Toaster richColors closeButton theme="light" />
    </>
  );
}
