import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-10 w-full"></Skeleton>
        <Skeleton className="h-8 w-full"></Skeleton>
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-8 w-16"></Skeleton>
      </CardFooter>
    </Card>
  );
}
