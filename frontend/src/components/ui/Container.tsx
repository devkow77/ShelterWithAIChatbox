import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={twMerge(className, "mx-auto max-w-7xl px-6")}>
      {children}
    </div>
  );
};

export default Container;
