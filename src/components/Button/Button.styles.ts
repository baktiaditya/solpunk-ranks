import { css } from '@emotion/react';
import { ThemeLib } from 'src/styles/theme';
import { rgba } from 'polished';

const createStyles = (t: ThemeLib) => {
  return {
    base: css`
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      padding: 6px 16px;
      margin: 0;
      border: 1px solid transparent;
      border-radius: ${t.border.radius.default}px;
      color: ${t.color.bluePrimary};
      background-color: transparent;
      user-select: none;
      outline: 0;
      min-width: 60px;
      transition: opacity ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        border-color ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        background-color ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        box-shadow ${t.animation.timing.fast}ms ${t.animation.easing.fast};

      &:focus {
        outline: 0;
      }
    `,
    disabled: css`
      &[disabled] {
        opacity: ${t.opacity.translucent};
        cursor: not-allowed;

        &:hover {
          opacity: ${t.opacity.translucent};
        }
      }
    `,

    /* Variant */
    primary: css`
      background-color: ${t.color.bluePrimary};
      border-color: ${t.color.bluePrimary};
      color: ${t.color.lightPrimary};

      &:active {
        opacity: 1;
        background-color: ${rgba(t.color.bluePrimary, t.opacity.opaque)};
      }
    `,
    secondary: css`
      background-color: ${t.color.purplePrimary};
      border-color: ${t.color.purplePrimary};
      color: ${t.color.lightPrimary};

      &:active {
        opacity: 1;
        background-color: ${rgba(t.color.purplePrimary, t.opacity.opaque)};
      }
    `,

    /* Sizes */
    small: css`
      padding: 3px 10px;
      font-size: ${t.typography.size.small}px;
    `,
    medium: css`
      font-size: ${t.typography.size.medium}px;
    `,

    /* Spinner */
    spinner: css`
      position: absolute;
      z-index: 10;
      pointer-events: none;
    `,

    /* Utils */
    hideVisibility: css`
      visibility: hidden;
    `,
    noPointerEvents: css`
      pointer-events: none;
    `,
  };
};

export default createStyles;
