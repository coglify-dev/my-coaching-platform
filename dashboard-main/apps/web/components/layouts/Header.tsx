import Link from "next/link";
import { useRouter } from "next/router";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@calcom/ui";

export function Header() {
  const router = useRouter();
  return (
    <div className="flex justify-between py-4">
      <div className="flex items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* <Icons.logo className="h-6 w-6" /> */}
          <span className="font-cal text-2xl font-bold sm:inline-block">Coglify.</span>
        </Link>
        {/* <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/coaches" className="font-cal">
              Explore coaches
            </Link>
          </nav> */}
      </div>
      <div>
        <Dropdown>
          <DropdownMenuTrigger asChild>
            <Button className="font-cal" variant="button" color="secondary">
              Get Started
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent style={{ minWidth: "200px" }}>
            <DropdownItem className="font-cal" type="button" onClick={() => router.push("/auth/login")}>
              I am a coach
            </DropdownItem>
            <DropdownMenuSeparator />
            <DropdownItem disabled className="font-cal" type="button" onClick={() => console.log("user")}>
              I have an organization (coming soon)
            </DropdownItem>
          </DropdownMenuContent>
        </Dropdown>
      </div>
    </div>
  );
}
