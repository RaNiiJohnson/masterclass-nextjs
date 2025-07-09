import { Review } from "./../../../src/generated/prisma/index.d";
import { prisma } from "@/lib/prisma";
import { SafeError } from "@/lib/safe-action";
import { route } from "@/lib/zod-route-client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const inputSchema = z.object({
  name: z.string(),
  review: z.string(),
});

export const POST = route
  .body(inputSchema)
  .handler(async (req, { body: input }) => {
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
    return {
      review: newReview,
    };
  });

// export const GET = async (request: NextRequest) => {
//   const Reviews = await prisma.review.findMany();

//   return NextResponse.json({ Reviews });
// };

// ?  POST without zod-safe
// export const POST = async (request: NextRequest) => {
//   const body = await request.json();
//   const input = inputSchema.parse(body);

//   if (input.name === "mechant") {
//     throw new SafeError("invalid name");
//   }
//   const newReview = await prisma.review.create({
//     data: {
//       review: input.review,
//       name: input.name,
//       star: 5,
//     },
//   });
//   return NextResponse.json({
//     review: newReview,
//   });
// };
