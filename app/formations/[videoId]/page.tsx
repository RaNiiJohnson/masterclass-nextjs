import { PageLayout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { VIDEOS } from "../data";

export default async function Page(props: {
  params: Promise<{ videoId: string }>;
}) {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  if (!video) {
    return <p>invalid video</p>;
  }

  return (
    <PageLayout>
      <Card>
        <CardHeader>
          <CardTitle>Plan de formation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ul className="list-disc list-inside">
            {video.lessons.map((lesson) => (
              <li key={lesson.id}>{lesson.title}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Link href="/formations">Back</Link>
        </CardFooter>
      </Card>
    </PageLayout>
  );
}
