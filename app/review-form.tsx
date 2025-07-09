"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { useAction } from "next-safe-action/hooks";
import { addReviewSafeAction } from "./review.action";
import { useRouter } from "next/navigation";

export const ReviewForm = () => {
  const { executeAsync, hasErrored, result, hasSucceeded } =
    useAction(addReviewSafeAction);

  const router = useRouter();

  const updateReview = async (obj: { name: string; review: string }) => {
    await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(obj),
    }).then((res) => res.json());

    router.refresh();
  };

  return (
    <form
      action={async (formData) => {
        const name = formData.get("name") as string;
        const review = formData.get("review") as string;
        await updateReview({ name, review });
      }}
      className="flex flex-col gap-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" id="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="review">Review</Label>
        <Textarea name="review" id="review" />
      </div>
      <SubmitButton>Submit</SubmitButton>
      {hasErrored ? <p className="text-red-500">{result.serverError}</p> : ""}
      {hasSucceeded ? (
        <p className="text-green-500">
          Review created with id : {result.data?.id}
        </p>
      ) : (
        ""
      )}
    </form>
  );
};

const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();

  return <Button {...props} disabled={pending} />;
};
