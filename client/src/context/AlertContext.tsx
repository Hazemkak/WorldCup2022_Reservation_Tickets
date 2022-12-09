import React, { createContext, useContext, useState } from "react";
export const defualtAlert = { text: "", type: "error", show: false };
export const AlertContext = createContext({ message: defualtAlert });

interface AlertContextProps {
  children: React.ReactNode;
}
export interface AlertContextType {
  message: { text: string; type: string; show: boolean };
  setAlert: Function;
  setMessage: Function;
}

export default function AlertContextProvider({ children }: AlertContextProps) {
  const [message, setMessage] = useState(defualtAlert);

  const setAlert = (text: string, type = "error", show = true) => {
    setMessage({
      text,
      type,
      show,
    });
  };
  return (
    <AlertContext.Provider
      value={{ message, setAlert, setMessage } as unknown as any}
    >
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext) as unknown as AlertContextType;

  return {
    message: context?.message,
    setAlert: context?.setAlert,
    setMessage: context?.setMessage,
  };
}
