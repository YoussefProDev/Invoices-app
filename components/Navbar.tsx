import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { buttonVariants } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { LOGIN_PAGE } from "@/routes";
import { requireUser } from "@/utils/hooks";
import { auth } from "@/auth";

export async function Navbar() {
  const isAuthenticated = await auth();

  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="size-10" />
        <h3 className="text-3xl font-semibold">
          Invoice<span className="text-blue-500">Marshal</span>
        </h3>
      </Link>
      <Link href="/auth/login">
        <RainbowButton>
          {isAuthenticated ? "Dashboard" : "Get Started"}
        </RainbowButton>
      </Link>
    </div>
  );
}
