"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UploadButton } from "./upload-button";
import { FileCard } from "./file-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization?.isLoaded ?? user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const isLoading = files === undefined;
  return (
    <main className="container mx-auto pt-12">
      {isLoading && (
        <div className="flex flex-col gap-6 w-full items-center mt-12">
          <Loader2 className="size-32 animate-spin text-gray-500" />
          <p className="text-2xl">Loading...</p>
        </div>
      )}
      {!isLoading && files.length === 0 && (
        <div className="flex flex-col gap-6 w-full items-center mt-12">
          <Image
            src="/empty.svg"
            alt="an image of empty directory icon"
            width={200}
            height={200}
          />
          <p className="text-2xl font-semibold">
            You have no file, upload one now
          </p>
          <UploadButton />
        </div>
      )}

      {!isLoading && files.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Your files</h1>
            <UploadButton />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {files?.map((file) => (
              <FileCard key={file._id} file={file} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
