import React, { createContext, useContext, useState } from "react";
import { AlertProps } from "@mui/material/Alert";
export const defualtAlert = { text: "", type: "error", show: false };
export const AlertContext = createContext({ message: defualtAlert });

interface AlertContextProps {
  children: React.ReactNode;
}
export interface AlertContextType {
  message: { text: string; type: string; show: boolean };
  setMessage: Function;
}

export default function AlertContextProvider({ children }: AlertContextProps) {
  const [message, setMessage] = useState(defualtAlert);
  return (
    <AlertContext.Provider value={{ message, setMessage } as unknown as any}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext) as unknown as AlertContextType;

  return {
    message: context?.message,
    setMessage: context?.setMessage,
  };
}
