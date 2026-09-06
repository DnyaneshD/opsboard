import type { ComponentPropsWithoutRef } from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonProps {
  variant?: ButtonVariant;
}

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.color.primary};
    color: #fff;
    border-color: transparent;
  `,
  secondary: css`
    background: transparent;
    color: ${({ theme }) => theme.color.text};
    border-color: ${({ theme }) => theme.color.border};
  `,
  danger: css`
    background: ${({ theme }) => theme.color.danger};
    color: #fff;
    border-color: transparent;
  `,
};

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(1)};
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(3)}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ $variant }) => variantStyles[$variant]}
`;

export function Button({
  variant = 'secondary',
  ...props
}: ButtonProps & ComponentPropsWithoutRef<'button'>) {
  return <StyledButton $variant={variant} {...props} />;
}
