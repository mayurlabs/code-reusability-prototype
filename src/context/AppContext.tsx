import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppState {
  hasCompletedScan: boolean;
  activePage: string;
  toasts: Toast[];
  showGenerateModal: boolean;
  scanInProgress: boolean;
}

interface AppContextType extends AppState {
  setActivePage: (page: string) => void;
  setHasCompletedScan: (v: boolean) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  setShowGenerateModal: (v: boolean) => void;
  setScanInProgress: (v: boolean) => void;
  triggerScan: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    hasCompletedScan: true,
    activePage: 'code-reusability',
    toasts: [],
    showGenerateModal: false,
    scanInProgress: false,
  });

  const setActivePage = useCallback((page: string) => {
    setState(s => ({ ...s, activePage: page }));
  }, []);

  const setHasCompletedScan = useCallback((v: boolean) => {
    setState(s => ({ ...s, hasCompletedScan: v }));
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setState(s => ({ ...s, toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => {
      setState(s => ({ ...s, toasts: s.toasts.filter(t => t.id !== id) }));
    }, 3000);
  }, []);

  const setShowGenerateModal = useCallback((v: boolean) => {
    setState(s => ({ ...s, showGenerateModal: v }));
  }, []);

  const setScanInProgress = useCallback((v: boolean) => {
    setState(s => ({ ...s, scanInProgress: v }));
  }, []);

  const triggerScan = useCallback(() => {
    setState(s => ({ ...s, showGenerateModal: false, scanInProgress: true }));
    showToast('Code Reuse scan started', 'info');
    setTimeout(() => {
      setState(s => ({ ...s, scanInProgress: false, hasCompletedScan: true }));
      showToast('Code Reuse scan completed successfully', 'success');
    }, 2500);
  }, [showToast]);

  return (
    <AppContext.Provider value={{
      ...state,
      setActivePage,
      setHasCompletedScan,
      showToast,
      setShowGenerateModal,
      setScanInProgress,
      triggerScan,
    }}>
      {children}
      {state.toasts.map(t => (
        <div key={t.id} className={`sf-toast ${t.type}`}>
          {t.type === 'success' && '✓'} {t.type === 'info' && 'ℹ'} {t.type === 'error' && '✕'} {t.message}
        </div>
      ))}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
