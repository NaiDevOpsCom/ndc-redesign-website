"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export interface TestimonialsColumnItem {
  text: string;
  avatar?: string; // initials or short text
  avatarColor?: string; // tailwind bg-* class
  name: string;
  role: string;
}

interface TestimonialsColumnProps {
  className?: string;
  testimonials: TestimonialsColumnItem[];
  duration?: number;
}

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 12,
}: TestimonialsColumnProps) {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, loopIndex) => (
          <Fragment key={`column-loop-${loopIndex}`}>
            {testimonials.map(({ text, avatar, avatarColor, name, role }, itemIndex) => (
              <div
                key={`${name}-${itemIndex}`}
                className="p-6 rounded-3xl border shadow-lg shadow-primary/5 bg-background/80 backdrop-blur"
              >
                <p className="text-base leading-relaxed text-muted-foreground">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3 mt-6">
                  <Avatar>
                    <AvatarFallback className={avatarColor ? avatarColor : "bg-muted"}>
                      {avatar ?? name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground leading-5 tracking-tight">{name}</span>
                    <span className="text-sm text-muted-foreground leading-5 tracking-tight">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
}

