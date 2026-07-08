"use client";

import { createContext, useContext, useState } from "react";

const DemoModalContext = createContext(null);

export function DemoModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DemoModalContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) throw new Error("useDemoModal must be used inside DemoModalProvider");
  return ctx;
}
