import { ReactNode } from "react";

interface ITitleProps {
  children: ReactNode;
}

const Title = ({ children }: ITitleProps) => {
  return <h1 className="flex justify-center text-6xl py-6">{children}</h1>;
};

export default Title;
