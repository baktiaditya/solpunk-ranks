/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, useTheme } from '@emotion/react';
import React from 'react';
import GridContext from './GridContext';

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default theme.grid.gutter */
  gutterWidth?: number;
  /** @default true */
  useGutter?: boolean;
}

const Row: React.FC<RowProps> = props => {
  const theme = useTheme();
  const { children, gutterWidth = theme.grid.gutter, useGutter = true, ...rest } = props;

  return (
    <div
      {...rest}
      css={[
        css`
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin-left: ${useGutter ? -1 * (gutterWidth / 2) : 0}px;
          margin-right: ${useGutter ? -1 * (gutterWidth / 2) : 0}px;
        `,
      ]}
    >
      <GridContext.Provider value={{ useGutter, gutterWidth }}>{children}</GridContext.Provider>
    </div>
  );
};

export default Row;
