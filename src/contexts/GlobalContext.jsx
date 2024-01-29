import React, { createContext, useCallback, useMemo, useState } from "react";

export const GlobalContext = createContext(null);

export function GlobalContextProvider({ children }) {
  const initialLoadingConfig = useMemo(
    () => ({
      isLoading: false,
      message: null,
      opacity: 1,
    }),
    []
  );
  const [loadingConfig, setLoadingConfig] = useState(initialLoadingConfig);
  const [notifierStates, setNotifierStates] = useState(null);

  const loading = useCallback(
    (options) => {
      setLoadingConfig((loadingConfig) => {
        if (!options.isLoading) return initialLoadingConfig;

        return { ...loadingConfig, ...options };
      });
    },
    [initialLoadingConfig]
  );

  return (
    <GlobalContext.Provider value={{ loadingConfig, loading, setNotifierStates, notifierStates }}>
      {children}
    </GlobalContext.Provider>
  );
}
