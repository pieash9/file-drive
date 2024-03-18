"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import { useState } from "react";
import { UploadButton } from "@/app/dashboard/_components/upload-button";
import { api } from "../../../../convex/_generated/api";
import { FileCard } from "@/app/dashboard/_components/file-card";
import { SearchBar } from "./search-bar";
import { DataTable } from "./file-table";
import { columns } from "./columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Label } from "@/components/ui/label";

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

export function FileBrowser({
  title,
  favoritesOnly,
  deletedOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<Doc<"files">["type"] | "all">("all");

  let orgId: string | undefined = undefined;
  if (organization?.isLoaded ?? user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );
  const files = useQuery(
    api.files.getFiles,
    orgId
      ? {
          orgId,
          type: type === "all" ? undefined : type,
          query,
          favorites: favoritesOnly,
          deletedOnly,
        }
      : "skip"
  );
  const isLoading = files === undefined;

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorite: (favorites ?? []).some(
        (favorite) => favorite.fileId === file._id
      ),
    })) ?? [];
  return (
    <div className="w-full">
      <>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{title}</h1>
          <SearchBar query={query} setQuery={setQuery} />
          <UploadButton />
        </div>

        <Tabs defaultValue="grid">
          <div className="flex justify-between items-center">
            <TabsList className="mb-4">
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <GridIcon className="size-6" /> Grid
              </TabsTrigger>
              <TabsTrigger value="table" className="flex items-center gap-2">
                <RowsIcon className="size-6" /> Table
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2 items-center">
              <Label htmlFor="type-select">Type filter</Label>
              <Select
                value={type}
                onValueChange={(newType) => setType(newType as any)}
              >
                <SelectTrigger id="type-select" className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <TabsContent value="grid">
            {isLoading && (
              <div className="flex flex-col gap-6 w-full items-center mt-12">
                <Loader2 className="size-32 animate-spin text-gray-500" />
                <p className="text-2xl">Loading...</p>
              </div>
            )}
            <div className="grid grid-cols-3 gap-4">
              {modifiedFiles &&
                modifiedFiles?.map((file) => (
                  <FileCard key={file._id} file={file} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="table">
            {isLoading && (
              <div className="flex flex-col gap-6 w-full items-center mt-12">
                <Loader2 className="size-32 animate-spin text-gray-500" />
                <p className="text-2xl">Loading...</p>
              </div>
            )}
            <DataTable columns={columns} data={modifiedFiles} />
          </TabsContent>
        </Tabs>

        {files && files.length === 0 && <Placeholder />}
      </>
    </div>
  );
}
