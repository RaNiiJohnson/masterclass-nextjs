import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";
import { SelectStar } from "./select-star";
import { revalidatePath } from "next/cache";

export default async function Page() {
  const reviews = await prisma.review.findMany();
  const setNewStar = async (reviewId: string, star: number) => {
    "use server";
    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        star,
      },
    });

    revalidatePath("/courses");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul className="list-disc list-inside">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center gap-1 mb-1">
                  <SelectStar
                    setNewStar={setNewStar.bind(null, review.id)}
                    star={review.star}
                  />
                </div>
                <CardTitle>{review.name}</CardTitle>
              </CardHeader>
              <CardContent>{review.review}</CardContent>
            </Card>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
