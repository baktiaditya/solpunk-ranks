/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import get from 'lodash/get';
import { TableProps, DefaultRecordType } from './Table.types';
import createStyles from './Table.styles';

type Props<RecordType = unknown> = Pick<TableProps<RecordType>, 'columns' | 'data' | 'emptyText'>;

const TableBody = <RecordType extends DefaultRecordType>(props: Props<RecordType>) => {
  const { columns, data, emptyText } = props;
  const theme = useTheme();
  const styles = createStyles(theme);

  const newData: [key: string, ...rest: React.ReactNode[]][] = [];
  if (data && columns) {
    data.forEach((record, recordIndex) => {
      const newItem: [key: string, ...rest: React.ReactNode[]] = [
        record.key ? String(record.key) : String(recordIndex),
      ];
      columns.forEach(column => {
        const { dataIndex, key, render } = column;
        if (render) {
          let d = record[key] as React.ReactNode;
          if (dataIndex) {
            d = get(record, dataIndex) as React.ReactNode;
          }
          newItem.push(
            key === 'action' ? (
              <div css={styles.actionRow}>{render(d, record)}</div>
            ) : (
              render(d, record)
            ),
          );
        } else if (dataIndex) {
          const d = record[dataIndex] as React.ReactNode;
          newItem.push(d);
        } else {
          const d = record[key] as React.ReactNode;
          newItem.push(d);
        }
      });
      newData.push(newItem);
    });
  }

  return (
    <tbody>
      {newData.length > 0 ? (
        newData.map((row, rowIndex) => {
          const [rowKey = rowIndex, ...restRow] = row;
          return (
            <tr key={rowKey}>
              {restRow.map((col, colIndex) => {
                return <td key={`${rowKey}-${colIndex}`}>{col}</td>;
              })}
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={columns && (columns.length || undefined)} style={{ textAlign: 'center' }}>
            {emptyText}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
