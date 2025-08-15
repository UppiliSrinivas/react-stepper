import React from "react";
// import { cn } from "@/lib/utils"; // or use 'clsx' if you prefer

type SpinnerProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  className?: string;
};

// const sizeMap: Record<string, string> = {
//   xs: "w-2 h-2",
//   sm: "w-4 h-4",
//   md: "w-6 h-6",
//   lg: "w-8 h-8",
//   xl: "w-10 h-10",
// };
// size = "md", className
const Spinner: React.FC<SpinnerProps> = () => {
  // const sizeClass = useMemo(() => {
  //   return typeof size === "number"
  //     ? `w-[${size}px] h-[${size}px]`
  //     : sizeMap[size] || sizeMap["md"];
  // }, [size]);

  return (
    <div>Loading..</div>
  );
};

export default React.memo(Spinner);
