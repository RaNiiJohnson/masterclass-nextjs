import { getUser } from "@/lib/auth-server";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Suspense } from "react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const Header = () => {
  return (
    <header className="flex items-center gap-4 px-4 py-2 border-b max-w-md mx-auto border-x">
      <Link href="/">App</Link>
      <div className="flex-1"></div>
      <Suspense fallback={<Skeleton className="h-10 w-20" />}>
        <AuthButton />
      </Suspense>
    </header>
  );
};

export const AuthButton = async () => {
  const user = await getUser();

  if (!user) {
    return (
      <Link
        href="/auth/signin"
        className={buttonVariants({ size: "sm", variant: "outline" })}
      >
        Sign in
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Avatar className="size-6">
            {user.image ? (
              <AvatarImage src={user.image} />
            ) : (
              <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
          <p>{user.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/auth" className="flex items-center gap-2">
            <User2 className="size-3" /> Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form>
            <button
              className="flex items-center gap-2 w-full"
              formAction={async () => {
                "use server";

                await auth.api.signOut({
                  headers: await headers(),
                });
                redirect("/auth/signin");
              }}
            >
              <LogOut className="size-4" /> Logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
