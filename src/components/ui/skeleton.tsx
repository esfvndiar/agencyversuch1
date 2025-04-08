import { cn } from "@/lib/utils"
import React from "react"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', animation = 'pulse', ...props }, ref) => {
    const baseClasses = 'bg-zinc-200 rounded';
    const variantClasses = {
      text: 'h-4 w-full',
      circular: 'h-12 w-12 rounded-full',
      rectangular: 'h-32 w-full'
    }[variant];

    const animationClasses = {
      pulse: 'animate-pulse',
      wave: 'animate-shimmer bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 bg-[length:200%_100%]',
      none: ''
    }[animation];

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variantClasses, animationClasses, className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton }
