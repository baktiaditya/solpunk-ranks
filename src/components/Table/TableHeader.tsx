/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, useTheme } from '@emotion/react';
import { TableProps, DefaultRecordType, State } from './Table.types';
import createStyles from './Table.styles';

type Props<RecordType = unknown> = Pick<TableProps<RecordType>, 'columns'>;

const TableHeader = <RecordType extends DefaultRecordType>(props: Props<RecordType>) => {
  const { columns } = props;
  const [sortColumns, setSortColumns] = React.useState<State>({
    column: undefined,
    direction: undefined,
  });
  const theme = useTheme();
  const styles = createStyles(theme);

  const handleClick =
    (key: string, onSortChange?: (direction: 'desc' | 'asc' | undefined) => void) => () => {
      let direction: State['direction'];
      if (sortColumns.column === undefined) {
        direction = 'asc';
      } else if (sortColumns.column === key && sortColumns.direction === 'asc') {
        direction = 'desc';
      } else if (sortColumns.column === key && sortColumns.direction === 'desc') {
        direction = undefined;
      } else if (sortColumns.column === key && sortColumns.direction === undefined) {
        direction = 'asc';
      } else if (sortColumns.column !== key) {
        direction = 'asc';
      }

      setSortColumns({ column: key, direction });
      onSortChange && onSortChange(direction);
    };

  if (columns) {
    return (
      <thead>
        <tr>
          {columns.map((column, index) => {
            const { key, sort, onSortChange, title } = column;
            const sortDirection = sortColumns.column === key ? sortColumns.direction : null;
            let content = title;
            if (sort) {
              content = (
                <div
                  css={[styles.title, sort && styles.titleSort]}
                  onClick={handleClick(key, onSortChange)}
                >
                  <span>{title}</span>
                  {sort && (
                    <span css={styles.titleSortIconContainer}>
                      <span css={[sortDirection === 'asc' && styles.titleSortIconActive]}>
                        <svg
                          viewBox="0 0 1024 1024"
                          focusable="false"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                        >
                          <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                        </svg>
                      </span>
                      <span css={[sortDirection === 'desc' && styles.titleSortIconActive]}>
                        <svg
                          viewBox="0 0 1024 1024"
                          focusable="false"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                        >
                          <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                        </svg>
                      </span>
                    </span>
                  )}
                </div>
              );
            }
            return <th key={key || index}>{content}</th>;
          })}
        </tr>
      </thead>
    );
  }
  return null;
};

export default TableHeader;
