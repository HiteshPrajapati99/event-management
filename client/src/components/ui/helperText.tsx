import { cn } from "@/lib/utils";

type HelperTextProps = {
  error?: boolean;
  text?: string;
  className?: string;
};

const HelperText = ({ error = false, text, className }: HelperTextProps) => {
  if (!text) return <></>;
  return (
    <p
      className={cn(
        `ml-2 font-medium text-gray-500 ${
          error && "text-red-600"
        } text-start w-full`,
        className
      )}
    >
      {text}
    </p>
  );
};

export default HelperText;
