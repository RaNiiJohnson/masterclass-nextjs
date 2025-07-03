import { PageLayout } from "@/components/layout";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function layout(props: PropsWithChildren) {
  return (
    <PageLayout>
      <div className="border-b -mx-4 px-4 pb-2">
        <Link href="/formations" className="font-black">
          /formations
        </Link>
      </div>
      {props.children}
    </PageLayout>
  );
}
