import { css } from '@emotion/react';
import { clearFix, rgba } from 'polished';
import { ThemeLib } from 'src/styles/theme';

const createStyles = (t: ThemeLib) => {
  return {
    container: css`
      font-size: ${t.typography.size.medium}px;
      padding-left: 0;
      margin-bottom: 0;
      ${clearFix()};
    `,
    item: css`
      float: left;
      list-style: none;

      a,
      span {
        position: relative;
        display: block;
        padding: 3px 6px;
        margin: 0 2px;
        min-width: 28px;
        text-align: center;
        outline: 0;
        user-select: none;
        color: ${t.color.lightPrimary};
      }

      a {
        cursor: pointer;
        text-decoration: none;
        border-radius: ${t.border.radius.default}px;
        transition: color 0ms;
        border: 1px solid transparent;

        &:hover,
        &:focus {
          color: ${t.color.lightPrimary};
          text-decoration: none;
        }
      }
    `,
    itemNav: css`
      a {
        min-width: unset;
      }
    `,
    itemNavDisabled: css`
      a {
        &,
        &:hover,
        &:focus {
          cursor: default;
          pointer-events: none;
          color: ${rgba(t.color.lightPrimary, 0.25)};
        }
      }
      i {
        border-color: ${rgba(t.color.lightPrimary, 0.25)};
      }
    `,
    itemBreak: css`
      span {
        min-width: unset;
        padding-left: ${t.spacing.xxs}px;
        padding-right: ${t.spacing.xxs}px;
      }
    `,
    itemActive: css`
      a {
        &,
        &:hover,
        &:focus {
          color: ${t.color.lightPrimary};
          cursor: default;
          pointer-events: none;
          border: 1px solid ${rgba(t.color.lightPrimary, 0.25)};
        }
      }
    `,
    arrow: css`
      border: solid ${t.color.lightPrimary};
      border-width: 0 1px 1px 0;
      display: inline-block;
      width: 5px;
      height: 5px;
    `,
    arrowLeft: css`
      vertical-align: 7.5%;
      transform: rotate(135deg);
    `,
    arrowRight: css`
      vertical-align: 7.5%;
      transform: rotate(-45deg);
    `,
  };
};

export default createStyles;
