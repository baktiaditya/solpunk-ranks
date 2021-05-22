/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import Pagination, { defaultProps as PaginationDefaultProps } from '../Pagination/Pagination';
import { TableProps, DefaultRecordType, PaginationProps } from './Table.types';
import createStyles from './Table.styles';

type Props<RecordType = unknown> = Pick<TableProps<RecordType>, 'data' | 'pagination'>;

const TableFooter = <RecordType extends DefaultRecordType>(props: Props<RecordType>) => {
  const { data, pagination } = props;
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

  return (
    <div css={styles.footer}>
      <div css={styles.footerRow}>
        <div css={styles.footerRowLeft}>
          {currentTotalData > 0
            ? `Showing ${text1}-${text2} from ${totalData} entries`
            : `Showing ${totalData} entry`}
        </div>
        <div>
          <Pagination {...rest} totalPage={totalPage} currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
};

export default TableFooter;
