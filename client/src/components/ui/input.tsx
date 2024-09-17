import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  error?: boolean;
  paperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      paperClassName = "",
      type,
      error,
      LeftIcon,
      RightIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "flex w-full items-center overflow-hidden rounded-lg border-2 bg-white  transition-all duration-300 gap-2 px-2",
          { "!border-red-500": error },
          paperClassName
        )}
      >
        {LeftIcon}
        <input
          type={type}
          onKeyDown={(evt) => {
            if (type === "number") {
              ["e", "E", "+", "-", "."].includes(evt.key) &&
                evt.preventDefault();
            }
          }}
          className={cn(
            `flex h-12 file:h-[96%] w-full px-0 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#737373] focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 2xl:text-[18px] file:text-gray-400`,
            className
          )}
          ref={ref}
          {...props}
        />
        {RightIcon}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
