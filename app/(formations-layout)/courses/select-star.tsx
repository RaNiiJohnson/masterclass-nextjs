"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState, useTransition } from "react";

export const SelectStar = (props: {
  star: number;
  onStarChange?: (star: number) => void;
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div
      onMouseLeave={() => {
        setHoverIndex(null);
      }}
      className={cn("flex items-center gap-1", {
        "animate-pulse": isPending,
      })}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < props.star;
        const isNewFilled = hoverIndex !== null ? i - 1 < hoverIndex : null;

        return (
          <button
            onMouseEnter={() => {
              setHoverIndex(i);
            }}
            key={i}
            onClick={() => {
              startTransition(() => {
                props.onStarChange?.(i + 1);
              });
            }}
          >
            <Star
              className={cn("text-yellow-500 cursor-pointer", {
                "fill-yellow-400": isFilled,
                "-translate-0.5 fill-orange-400 text-orange-400": isNewFilled,
              })}
              style={{
                transitionDelay: `0.1s`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
};
