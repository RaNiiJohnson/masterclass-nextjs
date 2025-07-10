import { PageLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>User profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Name</span>
            <span>{user.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Email</span>
            <span>{user.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
