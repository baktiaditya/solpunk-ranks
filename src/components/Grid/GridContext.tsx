import React from 'react';
import theme from 'src/styles/theme';

export type GridContextValue = {
  gutterWidth: number;
  useGutter: boolean;
};

const GridContext = React.createContext<GridContextValue>({
  gutterWidth: theme.grid.gutter,
  useGutter: true,
});

export default GridContext;
