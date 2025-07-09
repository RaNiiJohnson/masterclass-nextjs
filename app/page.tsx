import { PageLayout } from "@/components/layout";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { X } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { UpdateTitleForm } from "./(formations-layout)/courses/edit-title";
import { SelectStar } from "./(formations-layout)/courses/select-star";
import { ReviewForm } from "./review-form";

export default async function Home() {
  const reviews = await prisma.review.findMany();

  const changeStar = async (reviewId: string, star: number) => {
    "use server";

    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        star,
      },
    });
    revalidatePath("/");
  };

  const changeName = async (reviewId: string, name: string) => {
    "use server";

    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        name,
      },
    });
    revalidatePath("/");
  };

  return (
    <PageLayout>
      <h1>titre</h1>
      <Link href="/formations" className="text-indigo-500 underline">
        Plan de la formation
      </Link>
      <ModeToggle />
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="relative">
            <div className="absolute right-4 top-4">
              <form>
                <Button
                  formAction={async () => {
                    "use server";

                    await prisma.review.delete({
                      where: {
                        id: review.id,
                      },
                    });
                    revalidatePath("/");
                  }}
                  size="sm"
                  variant="outline"
                >
                  <X />
                </Button>
              </form>
            </div>
            <CardHeader>
              <SelectStar
                onStarChange={changeStar.bind(null, review.id)}
                star={review.star}
              />
              <UpdateTitleForm
                onTitleChange={changeName.bind(null, review.id)}
                className="text-lg font-bold"
              >
                {review.name}
              </UpdateTitleForm>
            </CardHeader>
            <CardContent>{review.review}</CardContent>
          </Card>
        ))}
      </div>
      <Card className="px-4">
        <ReviewForm />
      </Card>
    </PageLayout>
  );
}
