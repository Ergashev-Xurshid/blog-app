"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { EllipsisIcon, EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { deletePost } from "@/app/admin/actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Jadval qatoridagi "..." menyusi: ko'rish, tahrirlash, o'chirish (tasdiqlash oynasi bilan)
export default function PostRowActions({
  id,
  slug,
  title,
}: {
  id: number;
  slug: string;
  title: string;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deletePost(id);
        toast.success("Maqola o'chirildi");
        setConfirmOpen(false);
      } catch {
        toast.error("O'chirib bo'lmadi, qayta urinib ko'ring");
      }
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Amallar" />}>
          <EllipsisIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem render={<Link href={`/blog/${slug}`} target="_blank" />}>
            <EyeIcon />
            Ko&apos;rish
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/${id}/edit`} />}>
            <PencilIcon />
            Tahrirlash
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setConfirmOpen(true)}>
            <Trash2Icon />
            O&apos;chirish
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Maqola o&apos;chirilsinmi?</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{title}&quot; butunlay o&apos;chiriladi. Bu amalni ortga qaytarib bo&apos;lmaydi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Bekor qilish</AlertDialogCancel>
            <Button variant="destructive" onClick={handleDelete} disabled={pending}>
              {pending ? "O'chirilmoqda..." : "Ha, o'chirish"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
