import React, { useMemo } from "react";
import Icon from "./icon";
// import { cn } from "@/lib/utils"; // or use 'clsx' if you prefer

type SpinnerProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  className?: string;
};

const sizeMap: Record<string, string> = {
  xs: "w-2 h-2",
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
};

const Spinner: React.FC<SpinnerProps> = ({ size = "md", className }) => {
  const sizeClass = useMemo(() => {
    return typeof size === "number"
      ? `w-[${size}px] h-[${size}px]`
      : sizeMap[size] || sizeMap["md"];
  }, [size]);

  return (
    <Icon
      name="Loader2Icon"
      aria-label="Loading"
      role="status"
    //   className={cn("animate-spin text-muted", sizeClass, className)}
      className={sizeClass+className}
    />
  );
};

export default React.memo(Spinner);
