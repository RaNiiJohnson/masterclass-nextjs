"use server";

import { prisma } from "@/lib/prisma";
import { actionClient, SafeError } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";

const inputSchema = z.object({
  name: z.string(),
  review: z.string(),
});

export const addReviewSafeAction = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: input }) => {
    if (input.name === "mechant") {
      throw new SafeError("invalid name");
    }
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
