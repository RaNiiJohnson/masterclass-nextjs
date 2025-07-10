import { PageLayout } from "@/components/layout";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function layout(props: PropsWithChildren) {
  return <PageLayout>{props.children}</PageLayout>;
}
