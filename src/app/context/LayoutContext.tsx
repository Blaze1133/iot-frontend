import { createContext, useContext, useCallback, useEffect, useMemo, useState, ReactNode } from 'react';

interface LayoutContextType {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);
const SIDEBAR_KEY = 'iot-sidebar-collapsed';
const MOBILE_BREAKPOINT = 768;

function getInitialSidebarState() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(SIDEBAR_KEY) === '1';
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(getInitialSidebarState);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setMobileSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_KEY, isSidebarCollapsed ? '1' : '0');
  }, [isSidebarCollapsed]);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  }, [isMobile]);

  const value = useMemo(
    () => ({
      isSidebarCollapsed,
      toggleSidebar,
      setSidebarCollapsed: setIsSidebarCollapsed,
      isMobile,
      isMobileSidebarOpen,
      setMobileSidebarOpen,
    }),
    [isSidebarCollapsed, toggleSidebar, isMobile, isMobileSidebarOpen]
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
