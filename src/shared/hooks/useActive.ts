import { useState } from "react";

export const useActive = () => {
  const [active, set] = useState(false);
  return {
    active,
    bind: {
      onMouseDown: () => set(true),
      onMouseUp: () => set(false),
    },
  };
};
