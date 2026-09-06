import { createContext, useContext, type ReactNode } from 'react';
import type { DataProvider } from './types';

const DataProviderContext = createContext<DataProvider | null>(null);

export interface DataProviderProviderProps {
  provider: DataProvider;
  children: ReactNode;
}

/**
 * Makes a concrete DataProvider available to `use*` hooks via context, so
 * each MFE can be wired to a different data source (mock, REST, ...) at
 * the composition root without the hooks or components knowing which.
 */
export function DataProviderProvider({ provider, children }: DataProviderProviderProps) {
  return <DataProviderContext.Provider value={provider}>{children}</DataProviderContext.Provider>;
}

export function useDataProvider(): DataProvider {
  const provider = useContext(DataProviderContext);
  if (!provider) {
    throw new Error('useDataProvider must be used within a <DataProviderProvider>');
  }
  return provider;
}
