import { cn } from "@/lib/utils";

type LabelProps = {
  error?: boolean;
  label?: string;
  className?: string;
  htmlFor?: string;
};

const Label = ({ error = false, label, className, htmlFor }: LabelProps) => {
  if (!label) return <></>;
  return (
    <label
      className={cn(
        "mb-1 flex justify-start font-medium w-full",
        { "text-red-500": error },
        className
      )}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
};

export default Label;
