/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import Pagination, { defaultProps as PaginationDefaultProps } from '../Pagination/Pagination';
import { TableProps, DefaultRecordType, PaginationProps } from './Table.types';
import createStyles from './Table.styles';

type Props<RecordType = unknown> = Pick<
  TableProps<RecordType>,
  'data' | 'pagination' | 'footerTextPlural' | 'footerTextSingular'
>;

const TableFooter = <RecordType extends DefaultRecordType>(props: Props<RecordType>) => {
  const {
    data,
    pagination,
    footerTextSingular = 'Showing #text3 entry',
    footerTextPlural = 'Showing #text1-#text2 from #text3 entries',
  } = props;
  const {
    perPage = 10,
    totalData = 10,
    currentPage,
    ...rest
  }: PaginationProps = {
    ...PaginationDefaultProps,
    ...pagination,
  };
  const theme = useTheme();
  const styles = createStyles(theme);

  const currentTotalData = data ? data.length : 0;
  let text1 = 1;
  let text2 = currentTotalData;
  if (currentPage) {
    text1 = perPage * (currentPage - 1) + 1;
    text2 = text1 + currentTotalData - 1;
  }

  const totalPage = Math.ceil(totalData / perPage);

  const renderLeftText = () => {
    if (currentTotalData > 0) {
      if (currentTotalData > 1) {
        return footerTextPlural
          .replace('#text1', String(text1))
          .replace('#text2', String(text2))
          .replace('#text3', String(totalData));
      }
      return footerTextSingular.replace('#text3', String(totalData));
    }
    return null;
  };

  return (
    <div css={styles.footer}>
      <div css={styles.footerRow}>
        <div css={styles.footerRowLeft}>{renderLeftText()}</div>
        <div>
          <Pagination
            {...rest}
            totalPage={totalPage}
            currentPage={currentPage}
            marginPagesDisplayed={1}
          />
        </div>
      </div>
    </div>
  );
};

export default TableFooter;
