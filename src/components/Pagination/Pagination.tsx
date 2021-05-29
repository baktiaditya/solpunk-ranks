/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, useTheme, withTheme } from '@emotion/react';
import { ThemeLib } from 'src/styles/theme';
import createStyles from './Pagination.styles';

export type PaginationProps = {
  breakLabel: string;
  className?: string;
  currentPage: number;
  disableInitialCallback: boolean;
  marginPagesDisplayed: number;
  nextLabel: React.ReactNode;
  onPageChange?: (nextPageNum: number) => void;
  pageRangeDisplayed: number;
  previousLabel: React.ReactNode;
  theme: ThemeLib;
  totalPage: number;
};

const Arrow: React.FC<{ direction: 'left' | 'right' }> = props => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <i
      css={[
        styles.arrow,
        props.direction === 'left' && styles.arrowLeft,
        props.direction === 'right' && styles.arrowRight,
      ]}
    />
  );
};

export const defaultProps: Pick<
  PaginationProps,
  | 'breakLabel'
  | 'currentPage'
  | 'disableInitialCallback'
  | 'marginPagesDisplayed'
  | 'nextLabel'
  | 'pageRangeDisplayed'
  | 'previousLabel'
  | 'totalPage'
> = {
  breakLabel: '...',
  disableInitialCallback: true,
  marginPagesDisplayed: 2,
  nextLabel: <Arrow direction="right" />,
  currentPage: 1,
  pageRangeDisplayed: 2,
  previousLabel: <Arrow direction="left" />,
  totalPage: 10,
};

class Pagination extends React.Component<PaginationProps> {
  static defaultProps = defaultProps;

  componentDidMount() {
    // Call the callback with the initialPage item:
    if (!this.props.disableInitialCallback) {
      this.callCallback(this.props.currentPage);
    }
  }

  handlePreviousPage = (e: React.MouseEvent) => {
    e.preventDefault();

    if (this.props.currentPage > 1) {
      this.handlePageSelected(this.props.currentPage - 1)(e);
    }
  };

  handleNextPage = (e: React.MouseEvent) => {
    e.preventDefault();

    if (this.props.currentPage < this.props.totalPage) {
      this.handlePageSelected(this.props.currentPage + 1)(e);
    }
  };

  handlePageSelected = (selected: number) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();

      if (this.props.currentPage === selected) {
        return;
      }

      // Call the callback with the new selected item:
      this.callCallback(selected);
    };
  };

  getPageElement(index: number) {
    const styles = createStyles(this.props.theme);
    const isActive = this.props.currentPage === index;

    return (
      <li css={[styles.item, isActive && styles.itemActive]} key={index}>
        <a onClick={this.handlePageSelected(index)} tabIndex={0}>
          {index}
        </a>
      </li>
    );
  }

  callCallback(activeItem: number) {
    const { onPageChange } = this.props;
    onPageChange && onPageChange(activeItem);
  }

  renderPagination() {
    const {
      breakLabel,
      marginPagesDisplayed,
      currentPage: page,
      pageRangeDisplayed,
      theme,
      totalPage,
    } = this.props;
    const styles = createStyles(theme);
    const items = [];

    if (totalPage <= pageRangeDisplayed) {
      for (let index = 1; index <= totalPage; index++) {
        items[index] = this.getPageElement(index);
      }
    } else {
      let leftSide = pageRangeDisplayed / 2;
      let rightSide = pageRangeDisplayed - leftSide;

      if (page > totalPage - pageRangeDisplayed / 2) {
        rightSide = totalPage - page;
        leftSide = pageRangeDisplayed - rightSide;
      } else if (page < pageRangeDisplayed / 2) {
        leftSide = page;
        rightSide = pageRangeDisplayed - leftSide;
      }

      let index;
      let breakView = null;

      for (index = 1; index <= totalPage; index++) {
        const pageView = this.getPageElement(index);

        if (index <= marginPagesDisplayed) {
          items[index] = pageView;
          continue;
        }

        if (index > totalPage - marginPagesDisplayed) {
          items[index] = pageView;
          continue;
        }

        if (index >= page - leftSide && index <= page + rightSide) {
          items[index] = pageView;
          continue;
        }

        const keys = Object.keys(items);
        const breakLabelKey = keys[keys.length - 1];
        const breakLabelValue = items[Number(breakLabelKey)];

        if (breakLabel && breakLabelValue !== breakView) {
          breakView = (
            <li key={index} css={[styles.item, styles.itemBreak]}>
              <span>{breakLabel}</span>
            </li>
          );

          items[index] = breakView;
        }
      }
    }

    return items;
  }

  render() {
    const { className, nextLabel, currentPage: page, previousLabel, theme, totalPage } = this.props;
    const styles = createStyles(theme);

    return (
      <ul className={className} css={styles.container}>
        {totalPage > 0 && (
          <li css={[styles.item, styles.itemNav, page === 1 && styles.itemNavDisabled]}>
            <a onClick={this.handlePreviousPage} tabIndex={0}>
              {previousLabel}
            </a>
          </li>
        )}

        {this.renderPagination()}

        {totalPage > 0 && (
          <li css={[styles.item, styles.itemNav, page === totalPage && styles.itemNavDisabled]}>
            <a onClick={this.handleNextPage} tabIndex={0}>
              {nextLabel}
            </a>
          </li>
        )}
      </ul>
    );
  }
}

export default withTheme(Pagination);
