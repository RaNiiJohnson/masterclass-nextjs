import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VIDEOS } from "@app/(formations-layout)/formations/data";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Pageprops = {
  params: Promise<{ videoId: string; lessonId: string }>;
};

export const generateMetadata = async (props: Pageprops): Promise<Metadata> => {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  const lesson = video?.lessons.find((lesson) => lesson.id === params.lessonId);

  if (!lesson) {
    notFound();
  }

  return {
    title: `Lesson - ${lesson.title}`,
  };
};

export default async function Page(props: Pageprops) {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  if (!video) {
    return <p>invalid video</p>;
  }

  const lesson = video.lessons.find((lesson) => lesson.id === params.lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lesson.title}</CardTitle>
        <CardDescription>{lesson.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={`/formations/videos/${video.id}`}>Back</Link>
      </CardFooter>
    </Card>
  );
}
