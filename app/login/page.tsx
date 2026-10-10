import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeftIcon, LockKeyholeIcon } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { isLoggedIn } from "@/lib/session";

export const metadata: Metadata = {
  title: "Kirish",
  robots: { index: false },
};

export default async function LoginPage() {
  // Allaqachon kirgan bo'lsa — to'g'ri admin panelga
  if (await isLoggedIn()) redirect("/admin");

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <LockKeyholeIcon className="size-5" />
          </div>
          <CardTitle className="font-heading text-xl font-bold">Admin panelga kirish</CardTitle>
          <CardDescription>Davom etish uchun parolni kiriting</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <Link href="/" className="mt-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeftIcon className="size-4" />
        Saytga qaytish
      </Link>
    </main>
  );
}
