import { createContext, useState } from "react";

export const UIContext = createContext();

const UIProvider = ({ children }) => {
  
  const [eyeOpen, setEyeOpen] = useState(false);

  const value = {
    eyeOpen,
    setEyeOpen,
  }

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export default UIProvider;
