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
import {
  DownloadIcon,
  EllipsisVerticalIcon,
  StarHalf,
  StarIcon,
  TrashIcon,
  UndoIcon,
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { Protect } from "@clerk/nextjs";

export function FileCardAction({
  file,
  isFavorite,
}: {
  file: Doc<"files">;
  isFavorite: boolean;
}) {
  const deleteFile = useMutation(api.files.deleteFile);
  const restoreFile = useMutation(api.files.restoreFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast } = useToast();
  const me = useQuery(api.users.getMe);
  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark the file for deletion process. Files are
              deleted periodically.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });
                toast({
                  variant: "default",
                  title: "File marked for deleting",
                  description: "Your file will delete soon",
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
              window.open(getFileUrl(file.fileId), "_blank");
            }}
            className="flex items-center gap-1 cursor-pointer"
          >
            <DownloadIcon className="size-4" /> Download
          </DropdownMenuItem>

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

          <Protect
            condition={(check) => {
              return (
                check({
                  role: "org:admin",
                }) || file.userId === me?._id
              );
            }}
            fallback={<></>}
          >
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (file.shouldDelete) {
                  restoreFile({ fileId: file._id });
                } else {
                  setIsConfirmOpen(true);
                }
              }}
              className="flex items-center gap-1 text-red-600 cursor-pointer"
            >
              {file.shouldDelete ? (
                <div className="text-green-600 flex items-center gap-1 ">
                  <UndoIcon className="size-4" /> Restore
                </div>
              ) : (
                <div className="text-red-600 flex items-center gap-1 ">
                  <TrashIcon className="size-4" /> Delete
                </div>
              )}
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function getFileUrl(fileId: Id<"_storage">): string {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
}
