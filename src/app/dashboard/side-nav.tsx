"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FilesIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideNav() {
  const pathname = usePathname();
  return (
    <div className="w-40 flex flex-col gap-3">
      <Link href="/dashboard/files">
        <Button
          className={clsx("flex gap-2", {
            "text-blue-500": pathname.includes("/dashboard/files"),
          })}
          variant={"link"}
        >
          <FilesIcon /> All Files
        </Button>
      </Link>
      <Link href="/dashboard/favorites">
        <Button
          className={clsx("flex gap-2", {
            "text-blue-500": pathname.includes("/dashboard/favorites"),
          })}
          variant={"link"}
        >
          <StarIcon /> Favorites
        </Button>
      </Link>
    </div>
  );
}
