import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex w-full flex-col items-center justify-center gap-4 px-8">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-cal text-2xl font-bold sm:inline-block">Coglify.</span>
          </Link>
          <p className="font-cal text-center text-sm font-light md:text-left">
            Copyright © {new Date().getFullYear()} Coglify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
