"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    const email = formData.get("email");

    await authClient.forgetPassword(
      {
        email: String(email),
        redirectTo: "/reset-password",
      },
      {
        onSuccess: () => {
          router.push("/auth");
          router.refresh();
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>
          Enter your email if you've forgotten your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" />
          </div>
          <Button type="submit">Reset Password</Button>
        </form>
      </CardContent>
    </Card>
  );
}
