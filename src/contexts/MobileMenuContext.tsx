import { createContext, useState, useCallback, type ReactNode } from "react";

interface MobileMenuContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const MobileMenuContext = createContext<MobileMenuContextValue | null>(
  null,
);

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <MobileMenuContext.Provider
      value={{ isOpen, setIsOpen, open, close, toggle }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}
