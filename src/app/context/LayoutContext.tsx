import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

interface LayoutContextType {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);
const SIDEBAR_KEY = 'iot-sidebar-collapsed';

function getInitialSidebarState() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(SIDEBAR_KEY) === '1';
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(getInitialSidebarState);

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_KEY, isSidebarCollapsed ? '1' : '0');
  }, [isSidebarCollapsed]);

  const value = useMemo(
    () => ({
      isSidebarCollapsed,
      toggleSidebar: () => setIsSidebarCollapsed((prev) => !prev),
      setSidebarCollapsed: setIsSidebarCollapsed,
    }),
    [isSidebarCollapsed]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
