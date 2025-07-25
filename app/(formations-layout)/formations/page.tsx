import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { VIDEOS } from "./data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan de formation",
  description: "description",
};

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan de formation</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {VIDEOS.map((video) => (
          <Link
            href={`/formations/videos/${video.id}`}
            key={video.id}
            className="text-indigo-500 underline"
          >
            {video.title}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
