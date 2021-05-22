/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, useTheme } from '@emotion/react';
import createStyles from './Button.styles';

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'disabled'
> & {
  children: React.ReactNode;
  /** @default false */
  disabled?: boolean;
  /** @default "md" */
  size?: 'sm' | 'md';
  /** @default "button" */
  type?: 'submit' | 'reset' | 'button';
  /** @default "primary" */
  variant?: 'primary' | 'secondary';
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    disabled = false,
    role,
    size = 'md',
    type = 'button',
    variant = 'primary',
    ...rest
  } = props;

  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <button
      {...rest}
      ref={ref}
      role={role || 'button'}
      disabled={disabled}
      type={type}
      css={[
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        size === 'sm' && styles.small,
        size === 'md' && styles.medium,
        disabled && styles.disabled,
      ]}
    >
      <span css={[disabled && styles.noPointerEvents]}>{children}</span>
    </button>
  );
});

export default Button;
