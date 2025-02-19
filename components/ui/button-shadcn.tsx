import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes, FC } from "react";

const buttonVariants = cva("px-4 py-2 rounded-lg font-medium transition", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      outline: "border border-border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button: FC<ButtonProps> = ({ variant, className, ...props }) => {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
};
