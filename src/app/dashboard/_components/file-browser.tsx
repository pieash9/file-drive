"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { UploadButton } from "@/app/dashboard/_components/upload-button";
import { api } from "../../../../convex/_generated/api";

import { FileCard } from "@/app/dashboard/_components/file-card";
import { SearchBar } from "./search-bar";

function Placeholder() {
  return (
    <div className="flex flex-col gap-6 w-full items-center mt-12">
      <Image
        src="/empty.svg"
        alt="an image of empty directory icon"
        width={200}
        height={200}
      />
      <p className="text-2xl font-semibold">You have no file, upload one now</p>
      <UploadButton />
    </div>
  );
}

export function FileBrowser({ title }: { title: string }) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");

  let orgId: string | undefined = undefined;
  if (organization?.isLoaded ?? user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : "skip");
  const isLoading = files === undefined;
  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex flex-col gap-6 w-full items-center mt-12">
          <Loader2 className="size-32 animate-spin text-gray-500" />
          <p className="text-2xl">Loading...</p>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">{title}</h1>
            <SearchBar query={query} setQuery={setQuery} />
            <UploadButton />
          </div>
          {files.length === 0 && <Placeholder />}
          <div className="grid grid-cols-4 gap-4">
            {files?.map((file) => (
              <FileCard key={file._id} file={file} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
