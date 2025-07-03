import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Notfound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>404</CardTitle>
        <CardDescription>Lesson not found</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href="/formations">Back to /formations</Link>
      </CardFooter>
    </Card>
  );
}
