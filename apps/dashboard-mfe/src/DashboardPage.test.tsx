import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';
import { DataProviderProvider, createMockDataProvider } from '@opsboard/data-provider';
import { ThemeProvider } from '@opsboard/design-system';
import { DashboardPage } from './DashboardPage';

function renderDashboard() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const dataProvider = createMockDataProvider();

  return render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <DataProviderProvider provider={dataProvider}>
          <DashboardPage />
        </DataProviderProvider>
      </QueryClientProvider>
    </ThemeProvider>,
  );
}

describe('DashboardPage', () => {
  it('shows entities once loaded', async () => {
    renderDashboard();

    expect(screen.getByText('Loading dashboard…')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('checkout-api')).toBeInTheDocument());
    expect(screen.getByText('Fleet overview')).toBeInTheDocument();
  });
});
