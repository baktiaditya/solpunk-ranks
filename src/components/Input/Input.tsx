/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, useTheme, SerializedStyles } from '@emotion/react';
import isArray from 'lodash/isArray';
import createStyles from './Input.styles';

export type InputProps<T = unknown> = React.InputHTMLAttributes<HTMLInputElement> & {
  description?: React.ReactNode;
  /** @default false */
  disabled?: boolean;
  inputCSS?: SerializedStyles | Array<SerializedStyles>;
} & T;

const Input: React.FC<InputProps> = props => {
  const { className, description, disabled = false, inputCSS, ...rest } = props;
  const theme = useTheme();
  const styles = createStyles(theme);
  let inputStyles = [styles.input];
  if (inputCSS) {
    if (isArray(inputCSS)) {
      inputStyles = [...inputStyles, ...inputCSS];
    } else {
      inputStyles = [...inputStyles, inputCSS];
    }
  }

  return (
    <div className={className}>
      <div css={[styles.container]}>
        <div css={[styles.inputContainer]}>
          <input {...rest} disabled={disabled} css={inputStyles} />
        </div>
      </div>
      {description && <small css={styles.description}>{description}</small>}
    </div>
  );
};

export default Input;
