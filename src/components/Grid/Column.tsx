/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css, useTheme } from '@emotion/react';
import GridContext from './GridContext';
import isNumber from 'lodash/isNumber';
import { keys } from 'src/utils/object';

export interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Column order: [xs, sm, md, lg, xl]
   * @example <Column col={[12, 6]} />
   * @default []
   */
  col?: number[];
}

const Column: React.FC<ColumnProps> = props => {
  const { children, col = [], ...rest } = props;
  const { gutterWidth, useGutter } = React.useContext(GridContext);
  const theme = useTheme();
  const [xs, sm, md, lg, xl] = col;

  const styles = css`
    position: relative;
    flex-basis: 0;
    flex-grow: 1;
    min-width: 1px;
    padding-left: ${useGutter ? gutterWidth / 2 : 0}px;
    padding-right: ${useGutter ? gutterWidth / 2 : 0}px;
  `;

  const mq = {
    xs: isNumber(xs)
      ? css`
          flex: 0 0 ${100 * (xs / theme.grid.column)}%;
          max-width: ${100 * (xs / theme.grid.column)}%;
        `
      : null,
    sm: isNumber(sm)
      ? css`
          @media (min-width: ${theme.breakpoints.sm}px) {
            flex: 0 0 ${100 * (sm / theme.grid.column)}%;
            max-width: ${100 * (sm / theme.grid.column)}%;
          }
        `
      : null,
    md: isNumber(md)
      ? css`
          @media (min-width: ${theme.breakpoints.md}px) {
            flex: 0 0 ${100 * (md / theme.grid.column)}%;
            max-width: ${100 * (md / theme.grid.column)}%;
          }
        `
      : null,
    lg: isNumber(lg)
      ? css`
          @media (min-width: ${theme.breakpoints.lg}px) {
            flex: 0 0 ${100 * (lg / theme.grid.column)}%;
            max-width: ${100 * (lg / theme.grid.column)}%;
          }
        `
      : null,
    xl: isNumber(xl)
      ? css`
          @media (min-width: ${theme.breakpoints.xl}px) {
            flex: 0 0 ${100 * (xl / theme.grid.column)}%;
            max-width: ${100 * (xl / theme.grid.column)}%;
          }
        `
      : null,
  };

  return (
    <div {...rest} css={[styles, ...keys(mq).map(key => mq[key])]}>
      {children}
    </div>
  );
};

export default Column;
