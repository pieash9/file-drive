import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  EllipsisVerticalIcon,
  FileTextIcon,
  GanttChart,
  ImageIcon,
  StarHalf,
  StarIcon,
  TrashIcon,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Protect } from "@clerk/nextjs";

function FileCardAction({
  file,
  isFavorite,
}: {
  file: Doc<"files">;
  isFavorite: boolean;
}) {
  const deleteFile = useMutation(api.files.deleteFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast } = useToast();
  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });
                toast({
                  variant: "default",
                  title: "File deleted",
                  description: "Your file deleted successfully",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              toggleFavorite({
                fileId: file._id,
              });
            }}
            className="flex items-center gap-1 cursor-pointer"
          >
            {isFavorite ? (
              <StarIcon className="size-4" />
            ) : (
              <StarHalf className="size-4" />
            )}
            {isFavorite ? "Unfavorite" : "Favorite"}
          </DropdownMenuItem>

          {/* <Protect role="org:admin" fallback={<></>}> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsConfirmOpen(true);
            }}
            className="flex items-center gap-1 text-red-600 cursor-pointer"
          >
            <TrashIcon className="size-4" /> Delete
          </DropdownMenuItem>
          {/* </Protect> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function getFileUrl(fileId: Id<"_storage">): string {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
}

export function FileCard({
  file,
  favorites,
}: {
  file: Doc<"files">;
  favorites: Doc<"favorites">[];
}) {
  const typeIcon = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChart />,
  } as Record<Doc<"files">["type"], ReactNode>;

  const isFavorite = favorites.some((favorite) => favorite.fileId === file._id);

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2">
          <p>{typeIcon[file.type]}</p> {file.name}
        </CardTitle>
        <div className="absolute top-1 right-1">
          <FileCardAction isFavorite={isFavorite} file={file} />
        </div>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className="h-[200px] flex flex-col justify-center items-center">
        {file.type === "image" && (
          <Image
            src={getFileUrl(file.fileId)}
            width={200}
            height={100}
            alt={file.name}
          />
        )}
        {file.type === "csv" && <GanttChart className="size-20" />}
        {file.type === "pdf" && <FileTextIcon className="size-20" />}
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Button
          onClick={() => {
            window.open(getFileUrl(file.fileId), "_blank");
          }}
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
