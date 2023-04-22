import { createContext, useContext } from "react";
import React, { useState } from "react";
import { useToggle } from "../hooks/useToggle";
interface Props {
  children: React.ReactNode;
}

const DrawerContext = createContext<any>(null);

const DrawerProvider: React.FC<Props> = ({ children }) => {
  const [tabValue, setTabValue] = useState<string>("1");

  const [open, toggleDrawer] = useToggle();

  return (
    <DrawerContext.Provider
      value={{ tabValue, setTabValue, open, toggleDrawer }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);

export default DrawerProvider;
