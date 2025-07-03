import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { VIDEOS } from "../../data";
import { notFound } from "next/navigation";

type Pageprops = {
  params: Promise<{ videoId: string }>;
};

export const generateMetadata = async (props: Pageprops): Promise<Metadata> => {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  return {
    title: `Video - ${video?.title}`,
  };
};

export default async function Page(props: Pageprops) {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  if (!video) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Videos</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul className="list-disc list-inside">
          {video.lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link
                href={`/formations/videos/${video.id}/lessons/${lesson.id}`}
              >
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href="/formations">Back</Link>
      </CardFooter>
    </Card>
  );
}
