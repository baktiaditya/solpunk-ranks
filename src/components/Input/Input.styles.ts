import { css } from '@emotion/react';
import { rgba } from 'polished';
import { Theme } from 'src/styles/theme';

const createStyles = (t: Theme) => {
  return {
    container: css`
      position: relative;
    `,
    containerGroup: css`
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      width: 100%;
    `,

    inputContainer: css`
      position: relative;
      width: 100%;
    `,
    input: css`
      display: block;
      width: 100%;
      padding: 6px 12px;
      font-family: inherit;
      font-size: inherit;
      font-weight: ${t.typography.weight.regular};
      line-height: inherit;
      color: ${t.color.lightPrimary};
      background-color: transparent;
      background-clip: padding-box;
      border: 1px solid ${rgba(t.color.lightPrimary, 0.25)};
      border-radius: ${t.border.radius.default}px;
      transition: border-color ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        box-shadow ${t.animation.timing.fast}ms ${t.animation.easing.fast},
        background-color ${t.animation.timing.fast}ms ${t.animation.easing.fast};
      /* Fix appearance for date inputs in Safari */
      appearance: none;

      &:focus {
        border-color: ${rgba(t.color.lightPrimary, 0.25)};
        outline: 0;
        box-shadow: 0px 0px 0px 3px ${rgba(t.color.lightPrimary, t.opacity.seeThrough)};
      }

      &::placeholder {
        color: ${rgba(t.color.lightPrimary, 0.5)};
      }

      &:disabled {
        color: ${rgba(t.color.lightPrimary, 0.25)};
        border-color: ${rgba(t.color.lightPrimary, 0.25)};
        background-color: transparent;
      }
    `,
    textarea: css`
      min-height: 35px;
    `,

    description: css`
      display: block;
      margin-top: ${t.spacing.xxs}px;
      font-size: ${t.typography.size.small}px;
      color: ${t.color.lightSecondary};
    `,
  };
};

export default createStyles;
