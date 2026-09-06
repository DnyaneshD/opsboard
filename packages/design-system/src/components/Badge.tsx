import type { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

export type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface BadgeProps {
  tone?: BadgeTone;
}

const toneColor: Record<BadgeTone, keyof typeof import('../theme').theme.color> = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  neutral: 'textMuted',
};

const StyledBadge = styled.span<{ $tone: BadgeTone }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space(0.5)} ${theme.space(2)}`};
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme, $tone }) => theme.color[toneColor[$tone]]};
  background: ${({ theme, $tone }) => `${theme.color[toneColor[$tone]]}22`};
`;

export function Badge({ tone = 'neutral', ...props }: BadgeProps & ComponentPropsWithoutRef<'span'>) {
  return <StyledBadge $tone={tone} {...props} />;
}
