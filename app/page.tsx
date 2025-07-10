import { PageLayout } from "@/components/layout";
import { ModeToggle } from "@/components/theme-toggle";
import { getUser } from "@/lib/auth-server";
import Link from "next/link";

export default async function Home() {
  const user = await getUser();
  return (
    <PageLayout>
      <h1>titre</h1>
      <Link href="/formations" className="text-indigo-500 underline">
        Plan de la formation
      </Link>
      <ModeToggle />
    </PageLayout>
  );
}
