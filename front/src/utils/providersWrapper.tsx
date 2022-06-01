import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";

interface IProvidersWrapperProps {
  children: ReactNode;
}

const ProvidersWrapper = ({ children }: IProvidersWrapperProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default ProvidersWrapper;
