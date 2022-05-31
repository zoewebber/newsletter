import { FormEvent, ReactNode } from "react";

interface IFormProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (event: FormEvent) => void;
  children: ReactNode;
}

const Form = ({ onSubmit, children }: IFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 bg-emerald-100 rounded-lg w-[60rem] h-fit border-2 border-emerald-400 drop-shadow-2xl flex flex-col"
    >
      {children}
    </form>
  );
};

export default Form;
