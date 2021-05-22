/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, useTheme } from '@emotion/react';
import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default false
   */
  fluid?: boolean;
}

const Container: React.FC<ContainerProps> = props => {
  const { children, fluid = false, ...rest } = props;
  const theme = useTheme();

  let styles = css`
    width: 100%;
    padding-left: ${theme.spacing.m}px;
    padding-right: ${theme.spacing.m}px;
    margin-left: auto;
    margin-right: auto;
  `;
  if (!fluid) {
    styles = css`
      ${styles};
      max-width: 100%;
      @media (min-width: ${theme.breakpoints.sm}px) {
        max-width: ${theme.grid.container.sm}px;
      }
      @media (min-width: ${theme.breakpoints.md}px) {
        max-width: ${theme.grid.container.md}px;
      }
      @media (min-width: ${theme.breakpoints.lg}px) {
        max-width: ${theme.grid.container.lg}px;
      }
      @media (min-width: ${theme.breakpoints.xl}px) {
        max-width: ${theme.grid.container.xl}px;
      }
    `;
  }

  return (
    <div {...rest} css={styles}>
      {children}
    </div>
  );
};

export default Container;
