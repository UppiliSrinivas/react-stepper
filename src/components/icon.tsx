// components/Icon.tsx
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
}

const Icon = ({
  name,
  size = 20,
  color = "currentColor",
  ...props
}: IconProps) => {
  const LucideIcon = Icons[name];
  if (
    typeof LucideIcon === "function" ||
    (LucideIcon && typeof LucideIcon === "object")
  ) {
    // @ts-expect-error: LucideIcon is a valid React component here
    return <LucideIcon size={size} color={color} {...props} />;
  }
  return null;
};

export default Icon;
