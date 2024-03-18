import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { FileTextIcon, GanttChart, ImageIcon } from "lucide-react";
import { ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";
import { formatRelative } from "date-fns";
import { FileCardAction } from "./file-actions";

export function getFileUrl(fileId: Id<"_storage">): string {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
}

export function FileCard({
  file,
}: {
  file: Doc<"files"> & { isFavorite: boolean };
}) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });

  const typeIcon = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChart />,
  } as Record<Doc<"files">["type"], ReactNode>;

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 text-base font-normal">
          <p>{typeIcon[file.type]}</p> {file.name}
        </CardTitle>
        <div className="absolute top-1 right-1">
          <FileCardAction isFavorite={file.isFavorite} file={file} />
        </div>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className="h-[200px] flex flex-col justify-center items-center">
        {file.type === "image" && (
          <Image
            className="rounded"
            src={getFileUrl(file.fileId)}
            width={200}
            height={100}
            alt={file.name}
          />
        )}
        {file.type === "csv" && <GanttChart className="size-20" />}
        {file.type === "pdf" && <FileTextIcon className="size-20" />}
      </CardContent>
      <CardFooter className="flex items-center  gap-2">
        <div className="flex gap-2 w-40 items-center">
          <Avatar className="size-8 ">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="  text-xs">{userProfile?.name}</span>
        </div>
        <div className=" text-xs">
          Uploaded on {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}
