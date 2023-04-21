import { createContext, useContext } from "react";
import React, { useState } from "react";
interface Props {
  children: React.ReactNode;
}

const SwapSideBarTabsContext = createContext<any>(null);

const SwapSideBarProvider: React.FC<Props> = ({ children }) => {
  const [tabValue, setTabValue] = useState<string>("1");

  return (
    <SwapSideBarTabsContext.Provider value={{ tabValue, setTabValue }}>
      {children}
    </SwapSideBarTabsContext.Provider>
  );
};

export const useSwapDrawerTabs = () => useContext(SwapSideBarTabsContext);

export default SwapSideBarProvider;
