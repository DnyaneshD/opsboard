import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { DataProviderProvider, createMockDataProvider } from '@opsboard/data-provider';
import { ThemeProvider } from '@opsboard/design-system';
import { AlertsPage } from './AlertsPage';

function renderAlerts() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const dataProvider = createMockDataProvider();

  render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <DataProviderProvider provider={dataProvider}>
          <AlertsPage />
        </DataProviderProvider>
      </QueryClientProvider>
    </ThemeProvider>,
  );
}

describe('AlertsPage', () => {
  it('lists alerts and acknowledges one', async () => {
    renderAlerts();

    await waitFor(() =>
      expect(screen.getByText(/notification-worker has stopped processing/)).toBeInTheDocument(),
    );

    // The seed data already has one alert pre-acknowledged, so assert the
    // count grows from that baseline rather than just "at least one exists" —
    // otherwise the assertion would pass even if the click had no effect.
    expect(screen.getAllByText('acknowledged')).toHaveLength(1);

    const acknowledgeButtons = screen.getAllByRole('button', { name: 'Acknowledge' });
    expect(acknowledgeButtons).toHaveLength(2);

    await userEvent.click(acknowledgeButtons[0]!);

    await waitFor(() => expect(screen.getAllByText('acknowledged')).toHaveLength(2));
    expect(screen.getAllByRole('button', { name: 'Acknowledge' })).toHaveLength(1);
  });
});
