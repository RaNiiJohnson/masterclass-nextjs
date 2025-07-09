"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { ReviewFormSchema } from "./review.schema";

export const addReviewSafeAction = actionClient
  .inputSchema(ReviewFormSchema)
  .action(async ({ parsedInput: input }) => {
    const newReview = await prisma.review.create({
      data: {
        review: input.review,
        name: input.name,
        star: 5,
      },
    });

    revalidatePath("/");

    return newReview;
  });
