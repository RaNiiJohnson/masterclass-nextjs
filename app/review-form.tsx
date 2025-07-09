"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addReviewSafeAction } from "./review.action";
import { ReviewFormSchema } from "./review.schema";

export const ReviewForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof ReviewFormSchema>>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      name: "",
      review: "",
    },
  });
  const { executeAsync } = useAction(addReviewSafeAction);

  async function onSubmit(values: z.infer<typeof ReviewFormSchema>) {
    await executeAsync(values);
    router.refresh();
    form.reset();
  }
  // const updateReview = async (obj: { name: string; review: string }) => {
  //   await fetch("/api/reviews", {
  //     method: "POST",
  //     body: JSON.stringify(obj),
  //   }).then((res) => res.json());
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Heaven" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Input
                  placeholder="Bonsoir Maman, je t'aime beaucoup."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display review.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </Form>
    // <form
    //   action={async (formData) => {
    //     const name = formData.get("name") as string;
    //     const review = formData.get("review") as string;
    //     await updateReview({ name, review });
    //   }}
    //   className="flex flex-col gap-4"
    // >
    //   <div className="space-y-2">
    //     <Label htmlFor="name">Name</Label>
    //     <Input type="text" name="name" id="name" />
    //   </div>
    //   <div className="space-y-2">
    //     <Label htmlFor="review">Review</Label>
    //     <Textarea name="review" id="review" />
    //   </div>
    //   <SubmitButton>Submit</SubmitButton>
    //   {hasErrored ? <p className="text-red-500">{result.serverError}</p> : ""}
    //   {hasSucceeded ? (
    //     <p className="text-green-500">
    //       Review created with id : {result.data?.id}
    //     </p>
    //   ) : (
    //     ""
    //   )}
    // </form>
  );
};

const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();

  return <Button {...props} disabled={pending} />;
};
