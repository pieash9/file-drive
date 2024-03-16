import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="border-b py-4 bg-gray-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">
          File<span className="text-blue-500">Drive</span>
        </div>
        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignOutButton>
            <SignInButton>
              <Button>Sing In</Button>
            </SignInButton>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
