"use client";

import { useActionState } from "react";
import { CircleAlertIcon, Loader2Icon } from "lucide-react";
import { login } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, {});

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Parol</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          aria-invalid={!!state.error}
          className="h-9"
        />
      </div>

      {state.error && (
        <p className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <CircleAlertIcon className="size-4" />
          {state.error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending && <Loader2Icon data-icon="inline-start" className="animate-spin" />}
        {pending ? "Tekshirilmoqda..." : "Kirish"}
      </Button>
    </form>
  );
}
