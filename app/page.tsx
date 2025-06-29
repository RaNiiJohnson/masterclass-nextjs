import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>titre</h1>
      <Link href="/formations" className="text-indigo-500 underline">
        {" "}
        Plan de la formation
      </Link>
      <ModeToggle />
    </div>
  );
}
