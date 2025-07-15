import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";
import { AccountForm } from "./account-form";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0">
        <CardTitle>Edit account</CardTitle>
      </CardHeader>
      <CardContent>
        <AccountForm
          defaultValues={{
            name: user.name,
            image: user.image,
          }}
        />
      </CardContent>
    </Card>
  );
}
