import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@opsboard/design-system';
import { SduiRenderer } from './SduiRenderer';
import type { SduiNode } from './types';

describe('SduiRenderer', () => {
  it('renders a nested tree of nodes', () => {
    const node: SduiNode = {
      type: 'card',
      title: 'checkout-api',
      children: [
        { type: 'text', value: 'p99 latency is elevated.', variant: 'muted' },
        { type: 'metric', label: 'p99 latency', value: 240, unit: 'ms', trend: 'up' },
        { type: 'badge', label: 'degraded', tone: 'warning' },
      ],
    };

    render(
      <ThemeProvider>
        <SduiRenderer node={node} />
      </ThemeProvider>,
    );

    expect(screen.getByText('checkout-api')).toBeInTheDocument();
    expect(screen.getByText('p99 latency is elevated.')).toBeInTheDocument();
    expect(screen.getByText('240')).toBeInTheDocument();
    expect(screen.getByText('degraded')).toBeInTheDocument();
  });

  it('dispatches the button action on click', async () => {
    const onAction = vi.fn();
    const node: SduiNode = {
      type: 'button',
      label: 'Acknowledge',
      action: { type: 'acknowledgeAlert', alertId: 'alert-1' },
    };

    render(
      <ThemeProvider>
        <SduiRenderer node={node} onAction={onAction} />
      </ThemeProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Acknowledge' }));
    expect(onAction).toHaveBeenCalledWith({ type: 'acknowledgeAlert', alertId: 'alert-1' });
  });

  it('renders nothing and warns for an unregistered node type', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const node = { type: 'unknown-type' } as unknown as SduiNode;

    const { container } = render(
      <ThemeProvider>
        <SduiRenderer node={node} />
      </ThemeProvider>,
    );

    expect(container.textContent).toBe('');
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
