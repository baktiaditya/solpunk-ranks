import { css } from '@emotion/react';
import { rgba, lighten } from 'polished';
import { ThemeLib } from 'src/styles/theme';

const createStyles = (t: ThemeLib) => {
  return {
    wrapper: css`
      position: relative;
    `,
    container: css`
      font-size: ${t.typography.size.medium}px;
      color: ${t.color.lightPrimary};
    `,
    table: css`
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;

      th,
      td {
        border: 0;
        padding: ${t.spacing.xs}px ${t.spacing.s}px;
        white-space: normal;
        word-break: break-word;
      }

      thead {
        td,
        th {
          color: ${t.color.lightPrimary};
          text-align: left;
          font-weight: ${t.typography.weight.medium};
          padding-top: ${t.spacing.s}px;
          padding-bottom: ${t.spacing.s}px;
          border-top: 4px solid ${rgba(t.color.lightPrimary, 0.25)};
          border-bottom: 4px solid ${rgba(t.color.lightPrimary, 0.25)};
        }
      }

      tbody {
        tr {
          td {
            border-bottom: 1px solid ${rgba(t.color.lightPrimary, 0.25)};
          }

          &:last-child {
            td {
              border-bottom: 0;
            }
          }
        }
      }
    `,
    actionRow: css`
      margin-top: -${t.spacing.xxs}px;
      margin-bottom: -${t.spacing.xxs}px;

      button {
        margin-top: ${t.spacing.xxs}px;
        margin-bottom: ${t.spacing.xxs}px;
        margin-right: ${t.spacing.xs}px;

        &:last-of-type {
          margin-right: 0;
        }
      }
    `,
    footer: css`
      border-top: 4px solid ${rgba(t.color.lightPrimary, 0.25)};
      padding: ${t.spacing.s}px ${t.spacing.s}px;
    `,
    footerRow: css`
      display: flex;
      justify-content: space-between;
      align-items: center;

      ${t.mq({
        flexDirection: ['column', 'column', 'column', 'row', 'row'],
      })}
    `,
    footerRowLeft: css`
      ${t.mq({
        marginBottom: [t.spacing.m, t.spacing.m, t.spacing.m, 0, 0],
      })}
    `,

    // TableHeaderTitle
    title: css`
      position: relative;
      display: block;
      display: flex;
      align-items: center;
    `,
    titleSort: css`
      user-select: none;
      cursor: pointer;
    `,
    titleSortIconContainer: css`
      display: inline-flex;
      flex-direction: column;
      line-height: 0;
      color: ${t.color.lightPrimary};
      margin-top: 1px;
      margin-left: ${t.spacing.xs}px;

      > span {
        display: inline-block;
        font-size: 11px;
        font-style: normal;
        line-height: 0;
        text-align: center;
        text-transform: none;

        &:last-of-type {
          margin-top: -3px;
        }

        svg {
          display: inline-block;
          line-height: 1;
        }
      }
    `,
    titleSortIconActive: css`
      color: ${lighten(0.1, t.color.darkPrimary)};
    `,
  };
};

export default createStyles;
