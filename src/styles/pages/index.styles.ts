import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ThemeLib } from 'src/styles/theme';

const createStyles = (t: ThemeLib) => {
  return {
    ghCorner: css`
      display: block;
      position: absolute;
      right: 0;
      top: 0;

      ${t.mq({
        width: [50, 54, 66],
      })}
    `,
    ghCornerSvg: css`
      width: 100%;
      height: auto;
    `,
    main: css`
      display: flex;
      flex-direction: column;
      padding-top: ${t.spacing.xxxxl}px;
      min-height: 100vh;
    `,
    container: css`
      margin-bottom: ${t.spacing.xxl}px;
    `,
    headingContainer: css`
      margin-bottom: ${t.spacing.ml}px;
    `,
    heading: css`
      font-size: 0;
      line-height: 0;
      margin-bottom: 0;

      img {
        ${t.mq({
          height: [20, 24, 28],
        })}
        width: auto;
      }
    `,
    searchBox: css`
      margin-top: ${t.spacing.m}px;
      margin-bottom: ${t.spacing.m}px;
      display: flex;
      align-items: stretch;
    `,
    searchBoxInput: css`
      flex: 1;
    `,
    searchBoxInputInner: css`
      /* Chrome, Safari, Edge, Opera */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      /* Firefox */
      -moz-appearance: textfield;
    `,
    btnSearch: css`
      margin-left: ${t.spacing.s}px;
    `,
    img: css`
      image-rendering: -moz-crisp-edges;
      image-rendering: pixelated;
      background: rgb(47, 207, 183);
      background: linear-gradient(
        180deg,
        rgba(47, 207, 183, 1) 0%,
        rgba(111, 143, 209, 1) 50%,
        rgba(179, 73, 238, 1) 100%
      );
    `,
    footer: css`
      margin-top: auto;
      text-align: center;
      background-color: ${rgba(t.color.lightPrimary, t.opacity.clear)};
      padding: ${t.spacing.s}px 0;

      ${t.mq({
        fontSize: [t.typography.size.tiny, t.typography.size.tiny, t.typography.size.small],
      })}
    `,
  };
};

export default createStyles;
