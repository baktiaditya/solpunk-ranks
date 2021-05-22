import React from 'react';
import { TableProps, DefaultRecordType } from './Table.types';

type Props<RecordType = unknown> = Pick<TableProps<RecordType>, 'columns'>;

const TableColgroup = <RecordType extends DefaultRecordType>(props: Props<RecordType>) => {
  const { columns } = props;
  if (columns) {
    return (
      <colgroup>
        {columns.map((column, index) => {
          const key = column.key || index;
          if (column.width) {
            return <col key={key} style={{ width: column.width, minWidth: column.width }} />;
          }
          return <col key={key} />;
        })}
      </colgroup>
    );
  }
  return null;
};

export default TableColgroup;
