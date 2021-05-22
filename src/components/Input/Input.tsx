/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, useTheme } from '@emotion/react';
import createStyles from './Input.styles';

export type InputProps<T = unknown> = React.InputHTMLAttributes<HTMLInputElement> & {
  description?: React.ReactNode;
  /** @default false */
  disabled?: boolean;
} & T;

const Input: React.FC<InputProps> = props => {
  const { className, description, disabled = false, ...rest } = props;
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <div className={className}>
      <div css={[styles.container]}>
        <div css={[styles.inputContainer]}>
          <input {...rest} disabled={disabled} css={[styles.input]} />
        </div>
      </div>
      {description && <small css={styles.description}>{description}</small>}
    </div>
  );
};

export default Input;
