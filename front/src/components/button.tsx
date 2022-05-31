import { ReactNode } from "react";

interface IButtonProps {
  className?: string;
  children: ReactNode;
}

const Button = ({ className, children }: IButtonProps) => {
  return (
    <button
      className={
        "bg-emerald-400 rounded-lg w-fit px-4 py-2 text-3xl text-white hover:drop-shadow-lg" +
        `${className ? ` ${className}` : ""}`
      }
    >
      {children}
    </button>
  );
};

export default Button;
