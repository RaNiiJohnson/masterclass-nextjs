"use server";

import { getUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { actionUser } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { ReviewFormSchema } from "./review.schema";
import z from "zod";

export const addReviewSafeAction = actionUser
  .inputSchema(ReviewFormSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    // Récupérer l'utilisateur connecté
    const user = await getUser();

    if (!user) {
      throw new Error("Vous devez être connecté pour créer une review");
    }

    const newReview = await prisma.review.create({
      data: {
        review: input.review,
        name: input.name,
        star: 5,
        userId: ctx.user.id,
      },
    });

    revalidatePath("/");

    return newReview;
  });

export const updateReviewAction = actionUser
  .inputSchema(
    z.object({
      star: z.number().optional(),
      name: z.string().optional(),
      reviewId: z.string(),
    })
  )
  .action(async ({ parsedInput: input, ctx }) => {
    await prisma.review.update({
      where: {
        id: input.reviewId,
        userId: ctx.user.id,
      },
      data: {
        star: input.star,
        name: input.name,
      },
    });
  });

export const deleteReviewAction = actionUser
  .inputSchema(
    z.object({
      reviewId: z.string(),
    })
  )
  .action(async ({ parsedInput: input, ctx }) => {
    await prisma.review.delete({
      where: {
        id: input.reviewId,
        userId: ctx.user.id,
      },
    });
  });
