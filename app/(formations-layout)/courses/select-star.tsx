"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

export const SelectStar = (props: {
  star: number;
  setNewStar: (star: number) => void;
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => {
        setHoverIndex(null);
      }}
      className="flex items-center gap-1"
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
              props.setNewStar(i + 1);
            }}
          >
            <Star
              className={cn("text-yellow-500 cursor-pointer", {
                "fill-yellow-400": isFilled,
                "-translate-0.5 fill-orange-400 text-orange-400": isNewFilled,
              })}
              style={{
                transitionDelay: `${i * 0.1}s`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
};
