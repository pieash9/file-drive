import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="border-b py-4 bg-gray-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-semibold flex gap-2 items-center"
        >
          <Image src="/logo.png" height={40} width={40} alt="file drive logo" />
          <p>
            File<span className="text-blue-500">Drive</span>
          </p>
        </Link>

        <Button variant="ghost">
          <Link href="/dashboard/files">Your files</Link>
        </Button>

        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          B
        </div>
      </div>
    </div>
  );
};

export default Header;
