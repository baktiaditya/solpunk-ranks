/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, ThemeContext } from '@emotion/react';
import isEqual from 'lodash/isEqual';
import { TableProps as TablePropsBase, DefaultRecordType } from './Table.types';
import TableColgroup from './TableColgroup';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import createStyles from './Table.styles';
import { Theme } from 'src/styles/theme';

export type TableProps<RecordType = unknown> = TablePropsBase<RecordType>;

class Table<RecordType extends DefaultRecordType> extends React.Component<TableProps<RecordType>> {
  static contextType = ThemeContext;
  context!: Theme;

  shouldComponentUpdate(nextProps: TableProps<RecordType>) {
    return !isEqual(this.props, nextProps);
  }

  render() {
    const {
      columns,
      data,
      emptyText = 'No data found',
      layout = 'auto',
      footerTextPlural,
      footerTextSingular,
      pagination,
      scroll,
    } = this.props;
    const styles = createStyles(this.context);

    const contentStyle: React.CSSProperties = {};
    if (scroll && scroll.x) {
      contentStyle.overflow = 'auto hidden';
    }

    const tableStyle: React.CSSProperties = { tableLayout: layout };
    if (scroll && scroll.x) {
      tableStyle.width = scroll.x;
      tableStyle.minWidth = '100%';
    }

    return (
      <div css={styles.wrapper}>
        <div css={styles.container}>
          {/* Content */}
          <div style={contentStyle}>
            <table css={styles.table} style={tableStyle}>
              <TableColgroup<RecordType> columns={columns} />
              <TableHeader<RecordType> columns={columns} />
              <TableBody<RecordType> columns={columns} data={data} emptyText={emptyText} />
            </table>
          </div>
          {/* Footer */}
          <TableFooter<RecordType>
            data={data}
            pagination={pagination}
            footerTextPlural={footerTextPlural}
            footerTextSingular={footerTextSingular}
          />
        </div>
      </div>
    );
  }
}

export default Table;
