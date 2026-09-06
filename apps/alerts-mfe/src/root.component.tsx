import { QueryClientProvider } from '@tanstack/react-query';
import { DataProviderProvider, createMockDataProvider } from '@opsboard/data-provider';
import { ThemeProvider } from '@opsboard/design-system';
import { queryClient } from './queryClient';
import { AlertsPage } from './AlertsPage';

const dataProvider = createMockDataProvider();

export default function Root() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <DataProviderProvider provider={dataProvider}>
          <AlertsPage />
        </DataProviderProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
