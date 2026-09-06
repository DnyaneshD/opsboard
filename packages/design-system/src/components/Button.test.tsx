import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../ThemeProvider';
import { Button } from './Button';

function renderWithTheme(children: ReactNode) {
  return render(<ThemeProvider>{children}</ThemeProvider>);
}

describe('Button', () => {
  it('renders its label', () => {
    renderWithTheme(<Button>Acknowledge</Button>);
    expect(screen.getByRole('button', { name: 'Acknowledge' })).toBeInTheDocument();
  });

  it('fires onClick', async () => {
    const onClick = vi.fn();
    renderWithTheme(<Button onClick={onClick}>Acknowledge</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Acknowledge' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('respects disabled state', () => {
    renderWithTheme(<Button disabled>Acknowledge</Button>);
    expect(screen.getByRole('button', { name: 'Acknowledge' })).toBeDisabled();
  });
});
