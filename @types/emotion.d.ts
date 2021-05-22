import '@emotion/react';
import { Theme as CustomTheme } from '../src/styles/theme';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
