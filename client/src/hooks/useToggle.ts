import React, { useState } from "react";

export const useToggle = (initiaState: boolean = false) => {
  const [open, setOpen] = useState<boolean>(initiaState);

  const handleToggle = () => {
    setOpen(!open);
  };
  return [open, handleToggle] as const;
};
